var menu, main, drawer;
window.onload = function() {
  menu = document.querySelector('#menu');
  main = document.querySelector('.main');
  drawer = document.querySelector('.nav');

  EventUtil.addHandler(menu, 'click', function(e) {
      var e=EventUtil.getEvent(e);
      EventUtil.preventDefault(e);
      DOMUtil.hasClass(drawer,'open');
      DOMUtil.toggleClass(drawer,'open');
      EventUtil.stopPropagation(e);
  });
  EventUtil.addHandler(main, 'click', function(e) {
      DOMUtil.removeClass(drawer,'open');
  })
}
var xtr=new XMLHttpRequest();
var baseUrl="https://free-api.heweather.com/s6/weather/forecast?";
var Location="location=linfen";
var key="&key=9f13ef55e922456cadb8214d1186201e";
var url=baseUrl+Location+key;

var xtr2=new XMLHttpRequest();
var url2="https://free-api.heweather.com/s6/weather/now?"+Location+key;
xtr2.onreadystatechange=function() {
  if(xtr2.readyState === 4 && xtr2.status ===200) {
  var data=xtr2.responseText;
  var obj=JSON.parse(data);
  var curTmp=obj['HeWeather6'][0]["now"]["tmp"];
  console.log(curTmp);
  var realTimeTmp=document.querySelector(".weather__rt-temp");
  realTimeTmp.innerHTML=curTmp+'&deg;C<br>(实时温度)';
  }
}
xtr2.open('GET',url2,true);
xtr2.send();

xtr.onreadystatechange=function() {
  if(xtr.readyState ===4 && xtr.status ===200) {
    var data=xtr.responseText;
  var obj=JSON.parse(data);
  var dailyForecast=obj['HeWeather6'][0]["daily_forecast"];
  console.log(dailyForecast);
  displayDate(dailyForecast);
  displayTemp(dailyForecast);
  displayDesc(dailyForecast);
  displayWindCondition(dailyForecast);
  }
}
xtr.open('GET',url,true);
xtr.send();
function displayDate(dailyForecast) {
  var weatherDate=document.querySelectorAll(".weather__date");
  dailyForecast.forEach(function(value,idx) {
      console.log(value.date);
      var dateArr=value.date.split("-");
      var month=dateArr[1].replace(/^0+/,"");
      var day=dateArr[2].replace(/^0+/,"");
      weatherDate[idx].innerHTML=month+'月'+day+'日';
  })
}
function displayTemp(dailyForecast) {
  var minTemp=document.querySelectorAll(".weather__tmp__min");
  var maxTemp=document.querySelectorAll(".weather__tmp__max");
  dailyForecast.forEach(function(value,idx) {
      minTemp[idx].innerHTML=value["tmp_min"]+"&deg;C-";
      maxTemp[idx].innerHTML=value["tmp_max"]+"&deg;C";
  })
}
function displayDesc(dailyForecast) {
  var weatherCondition=document.querySelectorAll(".weather_general");
  var weatherImg=document.querySelectorAll(".weather__img");
  var imgSrc;
  var time=new Date();
  var isDay=new Boolean((time.getHours()>=8)&&(time.getHours()<=17));
  
  dailyForecast.forEach(function(value,idx) {
      weatherCondition[idx].innerHTML=isDay?value["cond_txt_d"]:value["cond_txt_n"];
      imgSrc=isDay?(value["cond_code_d"]+".png"):(value["cond_code_n"]+".png");
      imgSrc="./images/cond_icon/"+imgSrc;
      weatherImg[idx].setAttribute("src",imgSrc);
  })
}
function displayWindCondition(dailyForecast) {
  var windDir=document.querySelectorAll(".wind__dir");
  var windSc=document.querySelectorAll(".wind__sc");
  dailyForecast.forEach(function(value,idx) {
      windDir[idx].innerHTML=value["wind_dir"];
      windSc[idx].innerHTML=value["wind_sc"]+"级";
  })
}
var weatherDate=document.querySelectorAll(".weather__date");
var arr=[1,2,3];
arr.forEach(function(value,idx) {
  weatherDate[idx].innerHTML=value;
})