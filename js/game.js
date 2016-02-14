var teamNames = ["The Walking Hopman", "Troop troep",
    "Zombies vs gidsen", "The legens of FrankenScout", "BadenPowellRises", 
    "awesombie-hunters", "Tent of the living dead"];

var nOfPosts = 30;

function Team (name) {
  this.name = name;
  this.colour = PickRandomColour(name);
  this.pointTotal = 0;
  this.dom = null;

  this.UpdateNrOfPostsOwned = function(){
    var count = 0;
    var self = this;
    posts.forEach(function(item, index, array){
      if(item.owner === self){
        count++;
      }
    });
    this.dom.children(".nrOfPostsOwned").text("heeft nu: " + count + " posten");
  }
}

function CaptureEvent (team, timestamp) {
  this.team = team;
  this.timestamp = timestamp;
}

function Post (nr){
  this.nr = nr;
  this.owner = null;
  this.dom = null;
  this.eventStack = new Array();
  this.GetCaptured = function(team){
    this.dom.css('background-color', selectedTeam.colour);
    this.owner = team;
    this.eventStack.push(new CaptureEvent(team, Date.now()));
    this.dom.children(".ownedBy").text("is nu van: " + team.name);
    team.UpdateNrOfPostsOwned();
    var previousCapture = this.eventStack[this.eventStack.length - 2];
    if(previousCapture)
      previousCapture.team.UpdateNrOfPostsOwned();
  }
  this.GetCurrentTimer = function() {
    if(this.owner)
      return Date.now() - this.eventStack[this.eventStack.length - 1].timestamp;
    else
      return 0;
  }
  this.UpdateTimer = function(){
    var temp = this.GetCurrentTimer();
    var minutes = Math.floor(temp/60000);
    temp %= 60000;
    var seconds = Math.floor(temp/1000);
    var pseconds = ("0" + seconds).slice(-2);
    temp %= 1000;
    var msecs = Math.floor(temp / 100);
    this.dom.children(".timer").text(minutes + ":" + pseconds + ":" + msecs);
  }
  this.GetTotalTimeForTeam = function(team){
    var total = 0;
    for(var i = 0; i<this.eventStack.length-1; i++){
      if(this.eventStack[i].team === team){
        total += this.eventStack[i + 1].timestamp - this.eventStack[i].timestamp;
      }
    }
    if(this.owner === team){
      total += this.GetCurrentTimer();
    }
    return total;
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
  li.append($("<div></div>").text("Nog geen posten").addClass("nrOfPostsOwned"));
  $("#patrouilles").append(li);
  this.dom = li;
});

$.each(posts, function(){
  var li = $("<li></li>").text("Post " + this.nr).css('background-color', "white").data("post", this);
  li.append($("<div></div>").text("").addClass("ownedBy"));
  li.append($("<div></div>").text("").addClass("timer"));
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
  $(post).data("post").GetCaptured(selectedTeam);
}

$('#patrouilles > li').click(function(){
  SelectPatrouille(this);
});

$('#posten > li').click(function(){
  if(selectedTeam)
    CaptureBase(this);
});

function TimerTick(){
  posts.forEach(function(item, index, array){
    item.UpdateTimer();
  });
}
var interval = setInterval(TimerTick, 110);
