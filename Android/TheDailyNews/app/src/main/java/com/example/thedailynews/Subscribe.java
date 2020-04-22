package com.example.thedailynews;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static android.view.View.GONE;
import static com.example.thedailynews.Login.getDefaults;

public class Subscribe extends AppCompatActivity {

    LinearLayout ll;
    ArrayList<String> names;
    ArrayList<String> ids;
    CheckBox[] ch;
    Boolean ticked[];
    Button done;
    ProgressBar progressBar;
    List<String> finallist;
    String finalString="";

    String alreadySubscribed[];

    private static String JSON_URL = Constants.base_url+"/api/suscribe";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_subscribe);
        ll =  findViewById(R.id.ll);
        done=findViewById(R.id.done);
        progressBar=findViewById(R.id.progressBar);
        done.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void onClick(View v) {
                finallist=new ArrayList<>();
                for(int k=0;k<ticked.length;k++){
                    if(ticked[k]){
                        finallist.add(ids.get(k));
                    }

                }
                if(finallist.size()<4){
                    Toast.makeText(Subscribe.this, "Select atleast 4 sources!", Toast.LENGTH_SHORT).show();
                    return;
                }
                done.setEnabled(false);
                finalString=String.join(",", finallist);
                Log.d("myapp","final String is : "+finalString);
//                Toast.makeText(Subscribe.this, finalString, Toast.LENGTH_SHORT).show();

                progressBar.setVisibility(View.VISIBLE);
                StringRequest stringRequest2=new StringRequest(Request.Method.POST, JSON_URL,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                try {
                                    Log.d("myapp",response);
                                    done.setEnabled(true);

                                    progressBar.setVisibility(GONE);

                                    JSONObject jsonObject=new JSONObject(response);
                                    String status=jsonObject.getString("status");

                                    if(status.equals("success")){
                                        Toast.makeText(Subscribe.this, "Subscribed Successfully!", Toast.LENGTH_SHORT).show();
                                    }
                                    else{
                                        Toast.makeText(Subscribe.this, "Fail", Toast.LENGTH_SHORT).show();
                                    }




                                } catch (JSONException error) {
                                    done.setEnabled(true);
                                    Log.d("myapp","Here1 "+error.getMessage().toString());
                                    Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                                }

                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                done.setEnabled(true);
                                Log.d("myapp","Here2: "+error.getMessage());
                                Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                            }
                        })
                {
                    @Override
                    protected Map<String, String> getParams()
                    {
                        Map<String, String> params = new HashMap<String, String>();
                        params.put("selected_list", finalString);
                        params.put("Android", "Android");
                        //params.put("password", passwordLogin.getText().toString());


                        return params;
                    }

                    @Override
                    public Map<String, String> getHeaders() throws AuthFailureError {
                        Map<String, String> header = new HashMap<String, String>();
                        header.put("Authorization", "Bearer "+getDefaults("usertoken",getApplicationContext()));
                        return header;
                    }
                };


                RequestQueue requestQueue = Volley.newRequestQueue(v.getContext());
                requestQueue.add(stringRequest2);





            }
        });


        ids=new ArrayList<>();
        names=new ArrayList<>();

        getSourceList();
    }

    void getSourceList(){
        String JSON_URL=Constants.base_url+"/api/currentUser";
        StringRequest stringRequest=new StringRequest(Request.Method.POST, JSON_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            progressBar = (ProgressBar) findViewById(R.id.progressBar);
                            progressBar.setVisibility(GONE);
                            done.setEnabled(true);


                            JSONObject resp=new JSONObject(response);
                            JSONObject currUser=resp.getJSONObject("user");
                            String suscribed_string=currUser.getString("suscribed");
                            Log.d("myapp","suscribed_string:"+suscribed_string);
                            String aa[];
                            aa=suscribed_string.split(",");
                            for(int w=0;w<aa.length;w++){

                                aa[w]=aa[w].replace("[","");
                                aa[w]=aa[w].replace("]","");
                                aa[w]=aa[w].replace("\\","");
                                aa[w]=aa[w].replace("\"","");

                                Log.d("myapp",aa[w]);
                            }
                            alreadySubscribed=aa;

                            JSONObject jsonObject=new JSONObject(loadJSONFromAsset());

                            if(jsonObject.getString("status").equals("success")) {
                                JSONArray articles = jsonObject.getJSONArray("sources");

                                Log.d("myapp", String.valueOf(articles.length()));
                                Toast.makeText(Subscribe.this, String.valueOf(articles.length()), Toast.LENGTH_SHORT).show();


                                ids.clear();
                                names.clear();

                                for (int i = 0; i < articles.length(); i++) {
                                    JSONObject singleArticle = articles.getJSONObject(i);

                                    String author = singleArticle.getString("url");//IMP
                                    String source = singleArticle.getString("unique_id");//IMP

                                    ids.add(author);
                                    names.add(source);


                                }
                                aftervolley();
                            }
                            else{
                                Toast.makeText(Subscribe.this, jsonObject.getString("status"), Toast.LENGTH_SHORT).show();
                            }


                        } catch (JSONException error) {
                            Log.d("myapp","JSONException "+error.toString());
                            Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("myapp","onErrorResponse "+error.toString());
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
        stringRequest.setRetryPolicy(new DefaultRetryPolicy(
                10000,
                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));
        requestQueue.add(stringRequest);

        ///


    }

    public String loadJSONFromAsset() {
        String json = null;
        try {
            InputStream is = getApplicationContext().getAssets().open("source.json");
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();
            json = new String(buffer, "UTF-8");
        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        }
        return json;
    }

    void aftervolley(){
        Log.d("myapp","names size: "+String.valueOf(names.size()));

        ch = new CheckBox[names.size()];
        ticked=new Boolean[names.size()];
        Arrays.fill(ticked,false);


        for(int i=0;i<alreadySubscribed.length;i++){

            int index=ids.indexOf(alreadySubscribed[i]);

            if(index>-1){
                ticked[index]=true;
            }
        }


        for(int i=0; i<names.size(); i++) {
            ch[i] = new CheckBox(this);
            ch[i].setId(i);
            ch[i].setText(names.get(i));
            ch[i].setChecked(ticked[i]);
            ll.addView(ch[i]);
            Log.d("longlist",names.get(i));
        }

        for (int i = 0; i < names.size(); i++) {
            final int j = i;
            ch[j].setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(CompoundButton buttonView,
                                             boolean isChecked) {

                    Log.d("myapp","Checked ID :: " + ch[j].getId() +isChecked);
                    ticked[j]=isChecked;

                }
            });
        }
    }
}
