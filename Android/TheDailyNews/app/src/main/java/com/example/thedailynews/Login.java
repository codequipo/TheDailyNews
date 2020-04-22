package com.example.thedailynews;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
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

public class Login extends AppCompatActivity {
    TextView create_account__text;
    EditText emailLogin,passwordLogin;
    Button login_btn;
    ProgressBar progressBar;

    private static String JSON_URL = Constants.base_url+"/users/login";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        create_account__text=findViewById(R.id.create_account__text);
        emailLogin=findViewById(R.id.emailLogin);
        passwordLogin=findViewById(R.id.passwordLogin);
        login_btn=findViewById(R.id.login_btn);
        progressBar=findViewById(R.id.progressBar);

        create_account__text.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(Login.this,Register.class);
                startActivity(intent);
            }
        });

        login_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                progressBar.setVisibility(View.VISIBLE);
                login_btn.setEnabled(false);
                StringRequest stringRequest=new StringRequest(Request.Method.POST, JSON_URL,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                try {
                                    Log.d("myapp",response);



                                    progressBar.setVisibility(INVISIBLE);

                                    JSONObject jsonObject=new JSONObject(response);
                                    String status=jsonObject.getString("status");
                                    String message=jsonObject.getString("message");
                                    if(status.equals("success")){
                                        String token=jsonObject.getString("token");

                                        setDefaults("usertoken",token,Login.this);
                                        Log.d("myapp",getDefaults("usertoken",Login.this));
                                        Toast.makeText(Login.this, message, Toast.LENGTH_SHORT).show();
                                        Intent intent=new Intent(Login.this,HomeActivity.class);
                                        startActivity(intent);
                                    }
                                    else{
                                        login_btn.setEnabled(true);
                                        Toast.makeText(Login.this, message, Toast.LENGTH_SHORT).show();
                                    }




                                } catch (JSONException error) {
                                    login_btn.setEnabled(true);
                                    Log.d("myapp","Here1 "+error.getMessage().toString());
                                    Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                                }

                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                login_btn.setEnabled(true);
                                Log.d("myapp","Here2: "+error.getMessage());
                                Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                            }
                        })
                {
                    @Override
                    protected Map<String, String> getParams()
                    {
                        Map<String, String> params = new HashMap<String, String>();
                        params.put("email", emailLogin.getText().toString());
                        params.put("password", passwordLogin.getText().toString());


                        return params;
                    }

//                    @Override
//                    public Map<String, String> getHeaders() throws AuthFailureError {
//                        Map<String, String> header = new HashMap<String, String>();
//                        header.put("Authorization", "Bearer "+getDefaults("usertoken",getApplicationContext()));
//                        return header;
//                    }
                };


                RequestQueue requestQueue = Volley.newRequestQueue(v.getContext());
                requestQueue.add(stringRequest);
            }
        });
    }


    public static void setDefaults(String key, String value, Context context) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(key, value);
        editor.commit();
    }

    public static String getDefaults(String key, Context context) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(context);
        return preferences.getString(key, null);
    }
}
