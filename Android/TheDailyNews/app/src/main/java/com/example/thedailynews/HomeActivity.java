package com.example.thedailynews;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import static com.example.thedailynews.Login.setDefaults;

public class HomeActivity extends AppCompatActivity {
    Button news,bookmarks,subscribe,about;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        news=findViewById(R.id.news);
        bookmarks=findViewById(R.id.bookmarks);
        subscribe=findViewById(R.id.subscribe);
        about=findViewById(R.id.about);



        news.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(HomeActivity.this, "news", Toast.LENGTH_SHORT).show();
                Intent intent=new Intent(HomeActivity.this,MainActivity.class);
                intent.putExtra("comingfrom","newspage");
                startActivity(intent);
            }
        });
        bookmarks.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(HomeActivity.this, "bookmarks", Toast.LENGTH_SHORT).show();
                Intent intent=new Intent(HomeActivity.this,MainActivity.class);
                intent.putExtra("comingfrom","bookmarkpage");
                startActivity(intent);
            }
        });
        subscribe.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(HomeActivity.this, "subscribe", Toast.LENGTH_SHORT).show();
                Intent intent=new Intent(HomeActivity.this,Subscribe.class);
                startActivity(intent);
            }
        });
        about.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(HomeActivity.this, "about", Toast.LENGTH_SHORT).show();
                Intent intent=new Intent(HomeActivity.this,About.class);
                startActivity(intent);

            }
        });

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        getMenuInflater().inflate(R.menu.menu,menu);

        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        // Handle action bar actions click
        switch (item.getItemId()) {

            case R.id.action_logout:
                setDefaults("usertoken","",getApplicationContext());
                Intent intent=new Intent(HomeActivity.this,Login.class);
                startActivity(intent);
                finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
