import express from 'express';
import { body } from 'express-validator';
import { stationTypeA } from './categoryAstations.js';
import { stationTypeB } from './categoryBstations.js';
import { stationTypeC } from './categoryCstations.js';
import { stationTypeD } from './categoryDstations.js';
import { stationTypeA1 } from './categoryA1stations.js';
const app = express();
app.use(express.json());
const port = process.env.port||3000;
app.listen(port,()=>{
    console.log("Running on port "+port);
});

app.get("/",(request,response)=>{
    response.status(200).send({msg:"use endpoint /checkTrain to use the API"});
});

app.post("/checkTrain",
    (request,response)=>{
        const {body} = request;
        const startStation = body.start;
        const endStation = body.end;

        let startInd=-1;
        let endInd = -1;

        let startLat = 0,startLong =0;
        let endLat = 0,endLong =0;

        if(startInd==-1){
            startInd = stationTypeA.findIndex((value)=>value.STATION_NAME==startStation.toUpperCase());
            if(startInd!=-1){
                startLat = stationTypeA[startInd].Latitude;
                startLong = stationTypeA[startInd].Longitude;
            }
        }
        if(endInd==-1){
            endInd = stationTypeA.findIndex((value)=>value.STATION_NAME==endStation.toUpperCase());
            if(endInd!=-1){
                endLat = stationTypeA[endInd].Latitude;
                endLong = stationTypeA[endInd].Longitude;
            }
        }
        if(startInd==-1){
            startInd = stationTypeA1.findIndex((value)=>value.STATION_NAME==startStation.toUpperCase());
            if(startInd!=-1){
                startLat = stationTypeA1[startInd].Latitude;
                startLong = stationTypeA1[startInd].Longitude;
            }
        }
        if(endInd==-1){
            endInd = stationTypeA1.findIndex((value)=>value.STATION_NAME==endStation.toUpperCase());
            if(endInd!=-1){
                endLat = stationTypeA1[endInd].Latitude;
                endLong = stationTypeA1[endInd].Longitude;
            }
        }
        if(startInd==-1){
            startInd = stationTypeB.findIndex((value)=>value.STATION_NAME==startStation.toUpperCase());
            if(startInd!=-1){
                startLat = stationTypeB[startInd].Latitude;
                startLong = stationTypeB[startInd].Longitude;
            }
        }
        if(endInd==-1){
            endInd = stationTypeB.findIndex((value)=>value.STATION_NAME==endStation.toUpperCase());
            if(endInd!=-1){
                endLat = stationTypeB[endInd].Latitude;
                endLong = stationTypeB[endInd].Longitude;
            }
        }
        if(startInd==-1){
            startInd = stationTypeC.findIndex((value)=>value.STATION_NAME==startStation.toUpperCase());
            if(startInd!=-1){
                startLat = stationTypeC[startInd].Latitude;
                startLong = stationTypeC[startInd].Longitude;
            }
        }
        if(endInd==-1){
            endInd = stationTypeC.findIndex((value)=>value.STATION_NAME==endStation.toUpperCase());
            if(endInd!=-1){
                endLat = stationTypeC[endInd].Latitude;
                endLong = stationTypeC[endInd].Longitude;
            }
        }
        if(startInd==-1){
            startInd = stationTypeD.findIndex((value)=>value.STATION_NAME==startStation.toUpperCase());
            if(startInd!=-1){
                startLat = stationTypeD[startInd].Latitude;
                startLong = stationTypeD[startInd].Longitude;
            }
        }
        if(endInd==-1){
            endInd = stationTypeD.findIndex((value)=>value.STATION_NAME==endStation.toUpperCase());
            if(endInd!=-1){
                endLat = stationTypeD[endInd].Latitude;
                endLong = stationTypeD[endInd].Longitude;
            }
        }

        if(startInd==-1||endInd==-1){
            return response.status(400).send({msg:"Please check station name"});
        }

        const stationNearStartA = stationTypeA.find((data)=>{
            if(data.STATION_NAME!=startStation.toUpperCase()){
                const lat = data.Latitude;
                const long = data.Longitude;
                const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
                console.log(data.STATION_NAME+" "+distance);
                return distance<=100;
            }else{
                return false;
            }
        });
        const stationNearStartA1 = stationTypeA1.find((data)=>{
            if(data.STATION_NAME!=startStation.toUpperCase()){
                const lat = data.Latitude;
                const long = data.Longitude;
                const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
                console.log(data.STATION_NAME+" "+distance);
                return distance<=100;
            }else{
                return false;
            }
        });
        const stationNearStartB = stationTypeB.find((data)=>{
            if(data.STATION_NAME!=startStation.toUpperCase()){
                const lat = data.Latitude;
                const long = data.Longitude;
                const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
                console.log(data.STATION_NAME+" "+distance);
                return distance<=100;
            }else{
                return false;
            }
        });
        const stationNearStartC = stationTypeC.find((data)=>{
            if(data.STATION_NAME!=startStation.toUpperCase()){
                const lat = data.Latitude;
                const long = data.Longitude;
                const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
                console.log(data.STATION_NAME+" "+distance);
                return distance<=100;
            }else{
                return false;
            }
        });
        const stationNearStartD = stationTypeD.find((data)=>{
            if(data.STATION_NAME!=startStation.toUpperCase()){
                const lat = data.Latitude;
                const long = data.Longitude;
                const distance = Math.acos(Math.sin((startLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((startLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((startLong*Math.PI)/180)))*6371;//in km
                console.log(data.STATION_NAME+" "+distance);
                return distance<=100;
            }else{
                return false;
            }
        });
        const stationNearEndA = stationTypeA.find((data)=>{
            if(data.STATION_NAME!=endStation.toUpperCase()){
                const lat = data.Latitude;
                const long = data.Longitude;
                const distance = Math.acos(Math.sin((endLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((endLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((endLong*Math.PI)/180)))*6371;
                return distance<=100;
            }else{
                return false;
            }
        });
        const stationNearEndA1 = stationTypeA1.find((data)=>{
            if(data.STATION_NAME!=endStation.toUpperCase()){
                const lat = data.Latitude;
                const long = data.Longitude;
                const distance = Math.acos(Math.sin((endLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((endLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((endLong*Math.PI)/180)))*6371;
                return distance<=100;
            }else{
                return false;
            }
        });
        const stationNearEndB = stationTypeB.find((data)=>{
            if(data.STATION_NAME!=endStation.toUpperCase()){
                const lat = data.Latitude;
                const long = data.Longitude;
                const distance = Math.acos(Math.sin((endLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((endLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((endLong*Math.PI)/180)))*6371;
                return distance<=100;
            }else{
                return false;
            }
        });
        const stationNearEndC = stationTypeC.find((data)=>{
            if(data.STATION_NAME!=endStation.toUpperCase()){
                const lat = data.Latitude;
                const long = data.Longitude;
                const distance = Math.acos(Math.sin((endLat*Math.PI)/180)*Math.sin((lat*Math.PI)/180)+Math.cos((endLat*Math.PI)/180)*Math.cos((lat*Math.PI)/180)*Math.cos(((long*Math.PI)/180)-((endLong*Math.PI)/180)))*6371;
                return distance<=100;
            }else{
                return false;
            }
        });
        const stationNearEndD = stationTypeD.find((data)=>{
            if(data.STATION_NAME!=endStation.toUpperCase()){
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
            console.log(a.STATION_NAME+" "+d1+" "+b.STATION_NAME+" "+d2);
            return d1-d2;
        });
        let stationNearEnd = [];
        stationNearEnd = stationNearEnd.concat(stationNearEndA!=null?stationNearEndA:[],stationNearEndA1!=null?stationNearEndA1:[],stationNearEndB!=null?stationNearEndB:[],stationNearEndC!=null?stationNearEndC:[],stationNearEndD!=null?stationNearEndD:[]);
        stationNearEnd.sort((a,b)=>{
            const d1 = Math.acos(Math.sin(endLat*Math.PI/180)*Math.sin(a.Latitude*Math.PI/180)+Math.cos(endLat*Math.PI/180)*Math.cos(a.Latitude*Math.PI/180)*Math.cos((a.Longitude*Math.PI/180)-(endLong*Math.PI/180)))*6371;
            const d2 = Math.acos(Math.sin(endLat*Math.PI/180)*Math.sin(b.Latitude*Math.PI/180)+Math.cos(endLat*Math.PI/180)*Math.cos(b.Latitude*Math.PI/180)*Math.cos((b.Longitude*Math.PI/180)-(endLong*Math.PI/180)))*6371;
            return d1-d2;
        });
        response.status(200).send({"StationNearStart":stationNearStart,"StationNearEnd":stationNearEnd});

    }
);