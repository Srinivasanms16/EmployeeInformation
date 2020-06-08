##Step1 

##we are creating our image from node
From node:12.7-alpine as mybuildstep

##Info about person who mantain it .
MAINTAINER srinivasanms16@gmail.com

## we are installing angular/cli so that we can use ng commands
RUN npm install -g @angular/cli@9.0.7

##we are setting up the working Directory . 
##if the dirctory is not present it will create and set the pwd (Present working directory)
workDir /usr/src/app

##copying our package.json file to image .
copy package.json ./

## running npm insall so the node_modules will be present in our server
run npm install

## we are copying everthing from all our file to destination.
copy . .

## we are running ng build so that dest folder will be created in the server .
run ng build --prod=true

#step2

## we need nginx serve for hosting anular application.
From nginx:1.17.1-alpine 

## from step 1 are copying all the build output to nginx serve folder(usr/share/ngix/html)
copy --from=mybuildstep /usr/src/app/dist/AngLifecycleHookChangeDet /usr/share/nginx/html