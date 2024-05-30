const express = require("express");
const router = express.Router({mergeParams : true});



const Train = require("../models/train.js");
const Booking = require("../models/booking.js");

const wrapAsync = require("../utils/wrapasync.js");

const {isLoggedIn} = require("../middlewares.js");



const stationTypeA  =  require('../train_api/categoryAstations.js');
const stationTypeB  =  require('../train_api/categoryBstations.js');
const stationTypeC  =  require( '../train_api/categoryCstations.js');
const stationTypeD  = require('../train_api/categoryDstations.js');
const stationTypeA1  = require('../train_api/categoryA1stations.js');
const stations = require("../train_api/stations.js");


// api call import 

const train_api_irctc_call = require("../apis.js");
const wrapasync = require("../utils/wrapasync.js");


let alternating = (startStation, endStation) => {
    let startInd=-1;
    let endInd = -1;

    let startLat = 0,startLong =0;
    let endLat = 0,endLong =0;

    if(startInd==-1){
        startInd = stationTypeA.findIndex((value)=>value.STATION_CODE==startStation.toUpperCase());
        if(startInd!=-1){
            startLat = stationTypeA[startInd].Latitude;
            startLong = stationTypeA[startInd].Longitude;
        }
    }
    if(endInd==-1){
        endInd = stationTypeA.findIndex((value)=>value.STATION_CODE==endStation.toUpperCase());
        if(endInd!=-1){
            endLat = stationTypeA[endInd].Latitude;
            endLong = stationTypeA[endInd].Longitude;
        }
    }
    if(startInd==-1){
        startInd = stationTypeA1.findIndex((value)=>value.STATION_CODE==startStation.toUpperCase());
        if(startInd!=-1){
            startLat = stationTypeA1[startInd].Latitude;
            startLong = stationTypeA1[startInd].Longitude;
        }
    }
    if(endInd==-1){
        endInd = stationTypeA1.findIndex((value)=>value.STATION_CODE==endStation.toUpperCase());
        if(endInd!=-1){
            endLat = stationTypeA1[endInd].Latitude;
            endLong = stationTypeA1[endInd].Longitude;
        }
    }
    if(startInd==-1){
        startInd = stationTypeB.findIndex((value)=>value.STATION_CODE==startStation.toUpperCase());
        if(startInd!=-1){
            startLat = stationTypeB[startInd].Latitude;
            startLong = stationTypeB[startInd].Longitude;
        }
    }
    if(endInd==-1){
        endInd = stationTypeB.findIndex((value)=>value.STATION_CODE==endStation.toUpperCase());
        if(endInd!=-1){
            endLat = stationTypeB[endInd].Latitude;
            endLong = stationTypeB[endInd].Longitude;
        }
    }
    if(startInd==-1){
        startInd = stationTypeC.findIndex((value)=>value.STATION_CODE==startStation.toUpperCase());
        if(startInd!=-1){
            startLat = stationTypeC[startInd].Latitude;
            startLong = stationTypeC[startInd].Longitude;
        }
    }
    if(endInd==-1){
        endInd = stationTypeC.findIndex((value)=>value.STATION_CODE==endStation.toUpperCase());
        if(endInd!=-1){
            endLat = stationTypeC[endInd].Latitude;
            endLong = stationTypeC[endInd].Longitude;
        }
    }
    if(startInd==-1){
        startInd = stationTypeD.findIndex((value)=>value.STATION_CODE==startStation.toUpperCase());
        if(startInd!=-1){
            startLat = stationTypeD[startInd].Latitude;
            startLong = stationTypeD[startInd].Longitude;
        }
    }
    if(endInd==-1){
        endInd = stationTypeD.findIndex((value)=>value.STATION_CODE==endStation.toUpperCase());
        if(endInd!=-1){
            endLat = stationTypeD[endInd].Latitude;
            endLong = stationTypeD[endInd].Longitude;
        }
    }

    // if(startInd==-1||endInd==-1){
    //     return res.status(400).send({msg:"Please check station name"});
    // }

    const stationNearStartA = stationTypeA.find((data)=>{
        if(data.STATION_CODE!=startStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
            return distance<=100;
        }else{
            return false;
        }
    });
    const stationNearStartA1 = stationTypeA1.find((data)=>{
        if(data.STATION_CODE!=startStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
            return distance<=100;
        }else{
            return false;
        }
    });
    const stationNearStartB = stationTypeB.find((data)=>{
        if(data.STATION_CODE!=startStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
            return distance<=100;
        }else{
            return false;
        }
    });
    const stationNearStartC = stationTypeC.find((data)=>{
        if(data.STATION_CODE!=startStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
            return distance<=100;
        }else{
            return false;
        }
    });
    const stationNearStartD = stationTypeD.find((data)=>{
        if(data.STATION_CODE!=startStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
            return distance<=100;
        }else{
            return false;
        }
    });
    const stationNearEndA = stationTypeA.find((data)=>{
        if(data.STATION_CODE!=endStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((endLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((endLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((endLong*Math.PI)/180)))*6371;
            return distance<=100;
        }else{
            return false;
        }
    });
    const stationNearEndA1 = stationTypeA1.find((data)=>{
        if(data.STATION_CODE!=endStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((endLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((endLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((endLong*Math.PI)/180)))*6371;
            return distance<=100;
        }else{
            return false;
        }
    });
    const stationNearEndB = stationTypeB.find((data)=>{
        if(data.STATION_CODE!=endStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((endLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((endLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((endLong*Math.PI)/180)))*6371;
            return distance<=100;
        }else{
            return false;
        }
    });
    const stationNearEndC = stationTypeC.find((data)=>{
        if(data.STATION_CODE!=endStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((endLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((endLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((endLong*Math.PI)/180)))*6371;
            return distance<=100;
        }else{
            return false;
        }
    });
    const stationNearEndD = stationTypeD.find((data)=>{
        if(data.STATION_CODE!=endStation.toUpperCase()){
            const lat = data.Latitude;
            const long = data.Longitude;
            const distance = Math.acos(Math.sin((endLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((endLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((endLong*Math.PI)/180)))*6371;
            return distance<=100;
        }else{
            return false;
        }
    });
    let stationNearStart = [];
    stationNearStart = stationNearStart.concat(stationNearStartA!=null?stationNearStartA:[],stationNearStartA1!=null?stationNearStartA1:[],stationNearStartB!=null?stationNearStartB:[],stationNearStartC!=null?stationNearStartC:[],stationNearStartD!=null?stationNearStartD:[]);
    stationNearStart.sort((a,b)=>{
        const d1 = Math.acos(Math.sin(startLat*Math.PI/180)*Math.sin(a.Latitude*Math.PI/180)+Math.cos(startLat*Math.PI/180)*Math.cos(a.Latitude*Math.PI/180)*Math.cos((a.Longitude*Math.PI/180)-(startLong*Math.PI/180)))*6371;
        const d2 = Math.acos(Math.sin(startLat*Math.PI/180)*Math.sin(b.Latitude*Math.PI/180)+Math.cos(startLat*Math.PI/180)*Math.cos(b.Latitude*Math.PI/180)*Math.cos((b.Longitude*Math.PI/180)-(startLong*Math.PI/180)))*6371;
        return d1-d2;
    });
    let stationNearEnd = [];
    stationNearEnd = stationNearEnd.concat(stationNearEndA!=null?stationNearEndA:[],stationNearEndA1!=null?stationNearEndA1:[],stationNearEndB!=null?stationNearEndB:[],stationNearEndC!=null?stationNearEndC:[],stationNearEndD!=null?stationNearEndD:[]);
    stationNearEnd.sort((a,b)=>{
        const d1 = Math.acos(Math.sin(endLat*Math.PI/180)*Math.sin(a.Latitude*Math.PI/180)+Math.cos(endLat*Math.PI/180)*Math.cos(a.Latitude*Math.PI/180)*Math.cos((a.Longitude*Math.PI/180)-(endLong*Math.PI/180)))*6371;
        const d2 = Math.acos(Math.sin(endLat*Math.PI/180)*Math.sin(b.Latitude*Math.PI/180)+Math.cos(endLat*Math.PI/180)*Math.cos(b.Latitude*Math.PI/180)*Math.cos((b.Longitude*Math.PI/180)-(endLong*Math.PI/180)))*6371;
        
        return d1-d2;
    });
    return [stationNearStart, stationNearEnd];
}


// train home route

router.get("", isLoggedIn,  wrapAsync(async (req,res) => {
    let station = stations;
    res.render("./train/home.ejs" , {station})
}))



// search train route

router.get("/search_train" , wrapAsync(async (req,res) => {
    
    const {query} = req;
    const startStationCode = query.from;
    const endStationCode = query.to;
    const date = query.date;

    // train api call 
    console.log(startStationCode + " " + endStationCode + " " + date);

    // let trains = await Train.find();
    let trains = await train_api_irctc_call(startStationCode, endStationCode, date);
    //trains = [];
    res.render("./train/search_train.ejs" , {trains, startStationCode, endStationCode, date}); 
}))





// alternating station routes 

router.get("/alternating_stations" , wrapAsync(async (req,res) => {
    let start = req.query.startStationCode;
    let end = req.query.endStationCode;
    let date = req.query.date;
    let stations = alternating(start,end);
    let stationNearStart = stations[0];
    let stationNearEnd = stations[1];
    console.log("alter" + date);
    // res.status(200).send(stations);
    res.render("./train/alternating_stations.ejs",  {stationNearStart, stationNearEnd, start, end , date});
}))





// train booking route post

router.get("/booking" ,  isLoggedIn , wrapasync(async (req,res) => {
    let train = req.query.ob;
    console.log(train);

    let price = {
        "3A" : 1200,
        "2A" : 1500,
        "1A" : 2100,
        "SL" : 700,
        "3E" : 1300,
    }
    res.render("./train/booking.ejs", {train , price});
}))

router.post("/book" , isLoggedIn, wrapAsync(async (req,res) => {
    let booking = new Booking(req.body.ob);
    booking.owner = req.user._id;
    let user = req.user;
    await booking.save();
    req.flash("success" , "Ticket booked successfully")
    res.render("./users/ticket.ejs" , {booking, user});
}))


module.exports = router;