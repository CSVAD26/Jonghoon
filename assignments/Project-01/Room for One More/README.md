# Room for One More

https://jonghoonahn.com/sky/

I lay on the ground and looked at the sky. I wondered if I could launch clouds I drew into the sky and make shadows wherever I wanted.

I like shadows.

That thought became a drawing tool. I draw straight or curved lines on a small pad, grab the center of the shape, pull back, and let go. The shape flies into the white space, pushes against the shapes already there, and settles. When the space fills up, or when I want to stop, I save the scene and move on to the next face.

As I kept testing it, I noticed that I wanted to launch one more shape even when I did not have a picture in mind. The repeated action reminded me of squeezing a stress ball, tapping keys, or playing with a small object in my hands. It gave me a way to play with color without deciding on a finished composition first. Sometimes two colors ended up next to each other in a way I would not have planned. I began to think of the saved images as possible starting points for future color ideas.

## Design Principles

At first, I imagined placing clouds exactly where I wanted. Instead, I made a tool where I can aim and launch a shape, but cannot choose its final position. It may push the shapes already there, or be pushed by them. I choose the direction, then watch the composition change.

I wanted the shapes to touch and gradually form a shared surface. I experimented with outlines that press against and swell around one another, like soap bubbles or metaballs. Adding a shape changes its neighbors, so a launch can affect more than the area where it lands.

Color also moves between choice and chance. I can choose a color directly. After that, new shapes get different hues while keeping the saturation and brightness I selected. This lets me stay near a mood I like without knowing every color in advance. The balance and placement of colors emerge as I keep playing.

## Research Question

Can a short, repetitive drawing game help someone notice color combinations they might want to use later? I am interested in the moment when a playful action turns into a useful color idea. Each saved face records the colors, their relative areas, and which colors ended up beside one another. The current tool saves these compositions as images; it does not extract an editable palette automatically.

The interaction is inspired by small objects people fidget with to unwind. I have not tested whether this tool reduces stress. That is a question for a future study, not a result of this project.

## How to Run

In VS Code, right-click `index.html` and select **Open with Live Server**. Keep the `libraries` folder beside `index.html` and `sketch.js`. The buttons and color picker are drawn on the p5.js canvas.

## Controls

- Draw straight or curved lines on the pad at the bottom. Separate strokes can become one shape.
- Grab the center of the shape, pull back, and release to launch it in the opposite direction. `Space` also launches it.
- Click a placed shape to nudge it.
- Click the colored circle in the pad to open the picker. The lower bar changes hue, and the square changes saturation and brightness. You can also recolor a shape that is still in the pad.
- After you choose a color, new shapes get random hues while keeping the saturation and brightness you selected.

The number at the top shows how full the space is. At 97%, the tool moves to the next face. Click `? HELP` to see the controls on the canvas.

## Hand Input

Click `HAND` or press `H` to turn on the camera. Moving your hand moves the cursor. Make a fist to press and open your hand to release. To launch a shape, make a fist over its center, pull back, and open your hand.

Allow camera access when prompted. Loading the hand recognition model may require an internet connection.

## Images and Archive

Click `SAVE/NEXT` or press `S` to save the current image and move to a blank face. This also happens automatically at 97%. Once you have saved an image, press `G` to open the archive. You can download any saved face as a PNG.

The archive lasts only while the page is open. Download images you want to keep before refreshing or closing it.

## Results and Reflection

I enjoyed the repeated act of launching shapes. I especially liked seeing unexpected colors become neighbors, and watching patterns appear as the space filled. I often wanted to add one more shape just to see what it would do. The saved images let me look back at combinations I might not have chosen from a color picker alone. This is my observation from making and using the tool, rather than a finding about other users.

I still find it difficult to plan a precise combination because the next hue is random. Turning rough lines into closed shapes, and deforming their edges where they meet, can feel arbitrary too. I wanted them to share a smooth surface, but the boundaries between individual shapes remain visible. A next step would be to see whether other people find useful color ideas in their saved faces, and which parts of the throwing interaction they want to repeat.

## AI Use

I developed the concept and made the interaction and visual decisions through repeated testing. I used the course's p5.js examples and references while building the sketch. During development, I used ChatGPT to help implement and revise code, especially for hand recognition, PNG export, and the rotating 3D archive. It also helped with parts of the shape deformation, collision, color selection, and canvas interface code. I tested the changes and decided what to keep. AI was part of my development process, while the concept, direction, and final decisions came from my own work.