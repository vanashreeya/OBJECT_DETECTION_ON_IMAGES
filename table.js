status="";
objects=[];

function back()
{
    window.location="index.html";
}

function preload()
{
    img=loadImage("table.jpg");
}

function setup() 
{
    canvas=createCanvas(350,400);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded() 
{
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results) 
{
    if (error) 
    {
        console.error(error);
    } 
    else 
    {
        console.log(results);
        objects=results;
    } 
}

function draw() 
{
    image(img, 40, 40, 250, 300);
    if(status != "")
    {
        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML="Status : Objects Detected";

            fill("#FF0000");
            percent=floor(objects[i].confidence* 100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            document.getElementById("object_status").innerHTML="There are 6 objects in the image from which cocossd model has detected 1 object.";
        }
    }
}