package com.example.thedailynews;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static android.view.View.INVISIBLE;
import static com.example.thedailynews.Login.getDefaults;

public class MainActivity extends AppCompatActivity {

    Adapter adapter;
    ProgressBar progressBar;
    private String from;
    private static String JSON_URL = Constants.base_url+"/api/getnewsbysourcesAndroid";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        progressBar=findViewById(R.id.progressBar);

        try {
            if (getIntent().getStringExtra("comingfrom").equals("bookmarkpage")) {
                from="bookmarks";
                JSON_URL = Constants.base_url+"/api/getBookMarkedArticle";
            }

        }
        catch(Exception e){}

        try {
            if(getIntent().getStringExtra("comingfrom").equals("newspage")){
                from="newspage";
                JSON_URL = Constants.base_url+"/api/getnewsbysourcesAndroid";
            }
        }
        catch(Exception e){}
        Log.d("myapp","JSON_URL : "+JSON_URL);


        StringRequest stringRequest=new StringRequest(Request.Method.POST, JSON_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            Log.d("myapp",response);


                            progressBar.setVisibility(INVISIBLE);

                            JSONObject jsonObject=new JSONObject(response);
                            JSONArray articles=jsonObject.getJSONArray("articles");

                            Toast.makeText(MainActivity.this, String.valueOf(articles.length()), Toast.LENGTH_SHORT).show();

                            RecyclerView recyclerView=findViewById(R.id.recyclerView);
                            LinearLayoutManager storiesLayoutManager=new LinearLayoutManager(getApplicationContext());
                            storiesLayoutManager.setOrientation(RecyclerView.VERTICAL);
                            recyclerView.setLayoutManager(storiesLayoutManager);

                            List<NewsModel> list=new ArrayList<>();
                            for(int i=0;i<articles.length();i++){
                                JSONObject singleArticle=articles.getJSONObject(i);

                                String author=singleArticle.getString("_id");
                                String title=singleArticle.getString("title").toString();
                                String description=singleArticle.getString("text").toString();
                                String url=singleArticle.getString("url").toString();
                                String urlToImage=singleArticle.getString("top_image").toString();
                                String content=singleArticle.getString("text").toString();
                                String publishedAt=singleArticle.getString("createdAt").toString();

                                String source=singleArticle.getString("main_url_key").toString();


                                list.add(new NewsModel(title,content,author,publishedAt,urlToImage,url,source));


                                Log.d("myapp",title+"  ->"+author);
                            }

                            adapter=new Adapter(list,from);
                            recyclerView.setAdapter(adapter);

                        } catch (JSONException error) {
                            Log.d("myapp","Here1 "+error.getMessage().toString());
                            Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("myapp","Here2: "+error.getMessage());
                        Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                })
        {
//            @Override
//            protected Map<String, String> getParams()
//            {
//                Map<String, String> params = new HashMap<String, String>();
//                params.put("main_urls", "http://www.huffingtonpost.com");
//
//
//                return params;
//            }
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> header = new HashMap<String, String>();
                header.put("Authorization", "Bearer "+getDefaults("usertoken",getApplicationContext()));
                return header;
            }
        };


        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(stringRequest);





    }
}
