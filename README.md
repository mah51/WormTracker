# WormTracker v1.0


A website built using react that allows the user to load an image and overlay a grid for counting worm tracks on an agar plate.

### How to use:

1. Make sure image is in a web useable format (jpg, jpeg, png etc. (not TIFF)) (Most websites can convert these or you can go into paint and save as png)
2. Upload picture to some public webserver, in my examples i send my pictures on a discord channel and copy link so the website has access to them.
3. Set X and Y start points with the sliders, then set height and width to range in the grid
4. Click squares with worm tracks in, they will change to green. Note, a count of squares is displayed on the right.

N.B. The Grid can only be altered if the chrome window is over 1300px wide, this is to prevent the overlapping of the controls with the grid when zooming in. My CSS skills suck but I will try to fix this soon!

This code is [GPLv3 Licensed](https://github.com/mah51/WormTracker/blob/main/LICENSE)

![Screenshot of website](/screenshot.png)

###//TODO:

- Add ability to zoom :/
- Add copy settings to clipboard button.
- General display fixes. 
- Overlapping bug



