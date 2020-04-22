package com.example.thedailynews;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

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

public class Register extends AppCompatActivity {

    EditText email,first_name,last_name,password;
    Button create_account_btn;
    TextView login_text;
    private static String JSON_URL = Constants.base_url+"/users/register";
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        Log.d("myapp","Register :"+getDefaults("usertoken",getApplicationContext()));

        first_name=findViewById(R.id.first_name);
        last_name=findViewById(R.id.last_name);
        email=findViewById(R.id.email);
        password=findViewById(R.id.passwordLogin);
        create_account_btn=findViewById(R.id.create_account_btn);
        login_text=findViewById(R.id.login_text);
        progressBar=findViewById(R.id.progressBar);

        create_account_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                progressBar.setVisibility(View.VISIBLE);
                StringRequest stringRequest=new StringRequest(Request.Method.POST, JSON_URL,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                try {
                                    Log.d("myapp",response);


                                    progressBar.setVisibility(INVISIBLE);

                                    JSONObject jsonObject=new JSONObject(response);
//                                    JSONArray articles=jsonObject.getJSONArray("articles");
                                    String status=jsonObject.getString("status");
                                    String message=jsonObject.getString("message");
                                     if(status.equals("success")){
                                         Toast.makeText(Register.this, message, Toast.LENGTH_SHORT).show();
                                     }
                                     else{
                                         Toast.makeText(Register.this, message, Toast.LENGTH_SHORT).show();
                                     }




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
                    @Override
                    protected Map<String, String> getParams()
                    {
                        Map<String, String> params = new HashMap<String, String>();
                        params.put("first_name", first_name.getText().toString());
                        params.put("last_name", last_name.getText().toString());
                        params.put("email", email.getText().toString());
                        params.put("password", password.getText().toString());


                        return params;
                    }
                };


                RequestQueue requestQueue = Volley.newRequestQueue(v.getContext());
                requestQueue.add(stringRequest);
            }
        });
        
        login_text.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(Register.this,Login.class);
                startActivity(intent);
            }
        });
    }
}
