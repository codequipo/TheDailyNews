package com.example.thedailynews;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.bumptech.glide.Glide;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static android.view.View.INVISIBLE;
import static com.example.thedailynews.Login.getDefaults;
import static com.example.thedailynews.Login.setDefaults;

public class Adapter extends RecyclerView.Adapter<Adapter.ViewHolder> {

    private List<NewsModel> list;
    private String from;

    public Adapter(List<NewsModel> list,String from) {
        this.list = list;
        this.from=from;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(parent.getContext()).inflate(R.layout.item,parent,false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, final int position) {
        if(list.get(position).getImage_url().equals("")){
            holder.imageView.setVisibility(View.GONE);
        }
        else {
            Glide
                    .with(holder.itemView.getContext())
                    .load(list.get(position).getImage_url())

                    .into(holder.imageView);
        }
        holder.title.setText(list.get(position).getTitle());
        holder.content.setText(list.get(position).getContent());
//        holder.author.setText(list.get(position).getAuthor());
        holder.source.setText(list.get(position).getSource());
        holder.date.setText(list.get(position).getDate());
        holder.bookmarkbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Toast.makeText(holder.itemView.getContext(), list.get(position).getAuthor(), Toast.LENGTH_SHORT).show();
                //list.get(position).getAuthor()==>_id of article
                Log.d("myapp","ID"+list.get(position).getAuthor());
                handleBookmark(v.getContext(),list.get(position).getAuthor(),position);
            }
        });

        holder.link.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String url=list.get(position).getLink();

                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setData(Uri.parse(url));
                holder.itemView.getContext().startActivity(intent);


            }
        });
        holder.author.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String url=list.get(position).getLink();

                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setData(Uri.parse(url));
                holder.itemView.getContext().startActivity(intent);


            }
        });

    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    class ViewHolder extends  RecyclerView.ViewHolder{


        private TextView title,content,author,date,link,source;
        ImageView imageView;
        ImageButton bookmarkbutton;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            title=itemView.findViewById(R.id.title);
            content=itemView.findViewById(R.id.content);
            author=itemView.findViewById(R.id.author);
            date=itemView.findViewById(R.id.datetime);
            link=itemView.findViewById(R.id.link);
            source=itemView.findViewById(R.id.source);

            imageView=itemView.findViewById(R.id.imageView);
            bookmarkbutton=itemView.findViewById(R.id.bookmarkbutton);


        }
    }
    void handleBookmark(final Context context, final String id, final int position){
        String JSON_URL=Constants.base_url+"/api/addToBookmark";
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
                                Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
                                if(message.toLowerCase().contains("remove") && from.equals("bookmarks")){
                                    list.remove(position);
                                    notifyItemRemoved(position);
                                    notifyItemRangeChanged(position, list.size());
                                }

                            }
                            else{

                                Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
                            }




                        } catch (JSONException error) {

                            Log.d("myapp","Here1 "+error.getMessage().toString());
                            Toast.makeText(context, error.getMessage(), Toast.LENGTH_SHORT).show();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                        Log.d("myapp","Here2: "+error.getMessage());
                        Toast.makeText(context, error.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                })
        {
            @Override
            protected Map<String, String> getParams()
            {
                Map<String, String> params = new HashMap<String, String>();
                params.put("id", id);



                return params;
            }

                    @Override
                    public Map<String, String> getHeaders() throws AuthFailureError {
                        Map<String, String> header = new HashMap<String, String>();
                        header.put("Authorization", "Bearer "+getDefaults("usertoken",context));
                        return header;
                    }
        };


        RequestQueue requestQueue = Volley.newRequestQueue(context);
        requestQueue.add(stringRequest);
    }


}