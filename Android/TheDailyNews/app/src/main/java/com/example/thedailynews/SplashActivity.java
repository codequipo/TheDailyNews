package com.example.thedailynews;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import static android.view.View.INVISIBLE;
import static com.example.thedailynews.Login.getDefaults;

public class SplashActivity extends AppCompatActivity {
    private static String JSON_URL = Constants.base_url+"/users/checktokenvalidAndroid";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                // This method will be executed once the timer is over
                StringRequest stringRequest=new StringRequest(Request.Method.POST, JSON_URL,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                try {
                                    Log.d("myapp",response);




                                    JSONObject jsonObject=new JSONObject(response);
                                    String status=jsonObject.getString("status");
                                    String message=jsonObject.getString("message");
                                    if(status.equals("success")){
                                        Intent i = new Intent(SplashActivity.this, HomeActivity.class);
                                        startActivity(i);
                                        finish();
                                    }
                                    else{
                                        Intent i = new Intent(SplashActivity.this, Login.class);
                                        startActivity(i);
                                        finish();
                                    }





                                } catch (JSONException error) {
                                    Log.d("myapp","Here1 "+error.getMessage().toString());
                                    Intent i = new Intent(SplashActivity.this, Login.class);
                                    startActivity(i);
                                    finish();
                                    Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                                }

                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Log.d("myapp","Here2: "+error.getMessage());
                                Intent i = new Intent(SplashActivity.this, Login.class);
                                startActivity(i);
                                finish();
                                Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                            }
                        })
                {
                    @Override
                    public Map<String, String> getHeaders() throws AuthFailureError {
                        Map<String, String> header = new HashMap<String, String>();
                        header.put("Authorization", "Bearer "+getDefaults("usertoken",getApplicationContext()));
                        return header;
                    }
                };


                RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
                requestQueue.add(stringRequest);



            }
        }, 1000);
    }
}
