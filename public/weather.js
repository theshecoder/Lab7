$(document).ready(function() {
$( "#cityfield" ).keyup(function() {
  var url = "../getcity?q="+$("#cityfield").val();
  $.getJSON(url,function(data) {
  var everything;
  everything = "<ul>";
  $.each(data, function(i,item) {
    everything += "<li> "+data[i].city;
  });
    
  everything += "</ul>";
  $("#txtHint").html(everything);
  });
});

$("#button1").click(function(e){
  var value = $("#cityfield").val();
  console.log(value);
  e.preventDefault();
  $("#dispcity").text(value);
  
  var myurl= "https://api.wunderground.com/api/9971be56379a6f58/geolookup/conditions/q/UT/";
  myurl += value;
  myurl += ".json";
  console.log(myurl);
  $.ajax({
    url : myurl,
    dataType : "jsonp",
    success : function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_string = parsed_json['current_observation']['temperature_string'];
      var current_weather = parsed_json['current_observation']['weather'];
      everything = "<ul>";
      everything += "<li>Location: "+location;
      everything += "<li>Temperature: "+temp_string;
      everything += "<li>Weather: "+current_weather;
      everything += "</ul>";
      $("#weather").html(everything);
    }
  });
});


var apikey = "&api_key=a43bf4d4f9dedc11da5606151857669c";
var baseUrl = "http://api.themoviedb.org/3/";
var query = "search/movie?query=";
var img_base_url = "http://image.tmdb.org/t/p/";
var config_url="http://api.themoviedb.org/3/configuration";
// construct the uri with our apikey
$(document).ready(function() {
  get(config_url+"?"+apikey,"jsonp",function(data){img_base_url = data.images.base_url+data.images.poster_sizes[0]})
  $("#button2").click(function(e)
  {
    var url = baseUrl + query+$("#movieQuery").val() + apikey;
    get(url,"jsonp",results);
    e.preventDefault();
  });
  
});
// callback for when we get back the results
function results(data) {
  $("#movie_results").html(data.results.length+" Results for search '"+$("#movieQuery").val()+"'");
  data.results.forEach(function(item){$("#movie_results").append("<hr><ul>").append("<li>Title: "+item.title+"</li>").append("<li><img src="+img_base_url+item.poster_path+"></img></li>").append("<li>Popularity: "+item.popularity+"</li>").append("</ul><hr>")});
}
function get(url,type,callback)
{
  $.ajax({
        url: url,
        dataType: type,
        success: callback
    });
}

});