var teamNames = ["blauw", "geel",
    "groen", "paars", "deze patrouille is de beste", 
    "awesombie-hunters"];

var nOfPosts = 30;

function Team (name) {
  this.name = name;
  this.colour = PickRandomColour(name);
  this.pointTotal = 0;
}

function Post (nr){
  this.nr = nr;
  this.owner = null;
}

function PickRandomColour(seed) {
  return 'hsl('+Math.floor(Math.random()*361)+',80%,65%)';
}

var teams = new Array();
$.each(teamNames, function() {
  teams.push(new Team(this));
});

var posts = new Array();
for(var i = 0; i<nOfPosts; i++)
{
  posts.push(new Post(i+1));
}


$("#posten").empty();
$("#patrouilles").empty();

$.each(teams, function(){
  $("#patrouilles").append($("<li></li>").text(this.name).css('background-color', this.colour));
});

$.each(posts, function(){
  $("#posten").append($("<li></li>").text("Post " + this.nr).css('background-color', "white"));
});
