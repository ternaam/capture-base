var teamNames = ["blauw", "geel",
    "groen", "paars", "deze patrouille is de beste", 
    "awesombie-hunters"];

var nOfPosts = 30;

function Team (name) {
  this.name = name;
  this.colour = PickRandomColour(name);
  this.pointTotal = 0;
  this.dom = null;
}

function Post (nr){
  this.nr = nr;
  this.owner = null;
  this.dom = null;
  this.CaptureEvent = function(team){
    this.dom.css('background-color', selectedTeam.colour);
    this.owner = team;
  }
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

var selectedTeam = null;

$("#posten").empty();
$("#patrouilles").empty();

$.each(teams, function(){
  var li = $("<li></li>").text(this.name).css('background-color', this.colour).data("team", this);
  $("#patrouilles").append(li);
  this.dom = li;
});

$.each(posts, function(){
  var li = $("<li></li>").text("Post " + this.nr).css('background-color', "white").data("post", this);
  $("#posten").append(li);
  this.dom = li;
});

function DeselectAllPatrouilles(){
  $("#patrouilles > li").removeClass("selected");
  selectedTeam = null;
}

function SelectPatrouille(pat) {
  DeselectAllPatrouilles();
  $(pat).addClass("selected");
  selectedTeam = $(pat).data("team");
}

function CaptureBase(post) {
  $(post).data("post").CaptureEvent(selectedTeam);
}

$('#patrouilles > li').click(function(){
  SelectPatrouille(this);
});

$('#posten > li').click(function(){
  if(selectedTeam)
    CaptureBase(this);
});


