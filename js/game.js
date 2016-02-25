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
  this.totalsTable = new Array();

  this.GetCaptured = function(team){
    var capMoment = Date.now();
    this.dom.css('background-color', selectedTeam.colour);
    this.owner = team;

    if(this.eventStack.length > 0){
      var previousCapture = this.eventStack[this.eventStack.length - 1];
      previousCapture.team.UpdateNrOfPostsOwned();
      this.UpdateTotalForTeam(previousCapture.team, capMoment);
      console.log("just updated: " + previousCapture.team.name);
    }

    this.eventStack.push(new CaptureEvent(team, capMoment));
    this.dom.children(".ownedBy").text("is nu van: " + team.name);
    team.UpdateNrOfPostsOwned();

    this.EnsureEntryInTotalsTable(team);
  }

  this.GetCurrentTimer = function() {
    if(this.owner)
      return Date.now() - this.eventStack[this.eventStack.length - 1].timestamp;
    else
      return 0;
  }

  this.GetTotalTimeForTeam = function(team){
    var savedVal = this.totalsTable[team.name];
    var total = 0;

    if(savedVal)
      total = savedVal;
    else
      total = 0;

    if(this.owner === team)
      total += this.GetCurrentTimer();

    return total;
  }

  this.GetTotalTimeForTeamBackup = function(team){
    var total = 0;
    for(var i = 0; i<this.eventStack.length-1; i++){
      if(this.eventStack[i].team === team){

        console.log("gettottime" + this.eventStack[i + 1].timestamp + ", " + this.eventStack[i].timestamp);
        total += (this.eventStack[i + 1].timestamp - this.eventStack[i].timestamp);
      }
    }
    if(this.owner === team){
      total += this.GetCurrentTimer();
    }
    return total;
  }

  this.EnsureEntryInTotalsTable = function(team){
    if(!this.totalsTable[team.name]){
      this.totalsTable[team.name] = 0;
      console.log("ensureentries" + this.totalsTable[team.name]);
    }
  }

  this.UpdateTotalForTeam = function(team, timestamp){
    var timespan = timestamp - this.eventStack[this.eventStack.length - 1].timestamp;
        console.log("updateTot" + this.eventStack[this.eventStack.length - 1].timestamp + ", " + timestamp);
    this.totalsTable[team.name] += timespan;
    console.log("updatetotal: " + this.totalsTable[team.name]);
  }

  this.UpdateTimer = function(){
    var temp = this.GetCurrentTimer();
    var text = PrettyTimespan(temp);
    this.dom.children(".timer").text(text);
  }

}

function PrettyTimespan(span){
  var temp = span;
  var minutes = Math.floor(temp/60000);
  temp %= 60000;
  var seconds = Math.floor(temp/1000);
  var pseconds = ("0" + seconds).slice(-2);
  temp %= 1000;
  var msecs = Math.floor(temp / 100);
  return minutes + ":" + pseconds + ":" + msecs;
}

function GetTotalTimeForAllPosts(team){
  var retval = 0;
  $.each(posts, function(){
    retval += this.GetTotalTimeForTeam(team);
  });
  return retval;
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

function ShowFinalScore() {
  $("body").append($("<div></div>").addClass("finalScorePopup"));

  var list = $("<ul></ul>");
  $.each(teams, function(){
    var li = $("<li></li>").text(this.name).css('background-color', this.colour).data("team", this);
    li.append($("<div></div>").text("" + PrettyTimespan(GetTotalTimeForAllPosts(this)) +"").addClass("finalscoreforteam"));
    list.append(li);
  });
  $(".finalScorePopup").append(list);
}

$('#patrouilles > li').click(function(){
  SelectPatrouille(this);
});

$('#posten > li').click(function(){
  if(selectedTeam)
    CaptureBase(this);
});

$('#finalscore').click(ShowFinalScore);

function TimerTick(){
  posts.forEach(function(item, index, array){
    item.UpdateTimer();
  });
}
var interval = setInterval(TimerTick, 110);
