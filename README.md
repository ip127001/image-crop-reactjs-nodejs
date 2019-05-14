# image-crop-reactjs-nodejs

### frontend
```
react app
user can select image of only 1024*1024 size
if user select 1024*1024 size image then it push POST request to backend with image data.
if request comes true then 4 images are shown on second page ["http://localhost:3000/pics"]
```


### backend
```
node app
as POST API hit on backend then it uses sharp api to crop image to 4 types.
horizontal
vertical
horizontal-small
gallary
```
