- Room for One More

I lay on the ground and looked at the sky. I wondered if I could launch clouds I drew into the sky and make shadows wherever I wanted.

I like shadows.

This drawing tool began with that thought. I draw straight or curved lines on a small pad, grab the center of the shape, pull back, and let go. The shape flies into the white space, pushes against the shapes already there, and settles into place. When the space fills up, or when I want to stop, I save the scene as an image and move on to the next face.

- Design Principles

At first, I imagined placing clouds wherever I wanted, but I designed the tool so that users could not choose an exact position. Instead, they aim and launch a shape as if shooting an arrow. Once it arrives, it meets the shapes already there and pushes them around or shifts position itself. Even though I choose the direction, I cannot fully control the final composition.

I wanted the shapes to touch and gradually form a shared surface, rather than look like separate pieces. I experimented with forms that push against one another while appearing to merge, like soap bubbles or metaballs. I wanted to see how adding one new shape could change the surrounding shapes and the overall composition.

- How to Run

In VS Code, right-click `index.html` and select Open with Live Server. Keep the `libraries` folder in the same directory as `index.html` and `sketch.js`. The buttons and color picker are drawn on the p5.js canvas.

- Controls

- Draw straight or curved lines on the pad at the bottom of the screen. Multiple separate strokes can become a single shape.
- Grab the center of the shape, pull back, and release to launch it in the opposite direction. You can also press `Space` to launch.
- Click a shape already in the space to give it a gentle push.
- Click the colored circle inside the pad to open the color picker. The bar at the bottom adjusts hue, and the square adjusts saturation and brightness. You can also change the color of a shape while it is still on the pad.
- After you choose a color, subsequent shapes receive random hues while keeping your selected saturation and brightness.

The number at the top of the screen shows how full the space is. When it reaches 97%, the tool moves on to the next face. Click `? HELP` to view the controls on the canvas.

-  Hand Input

Click `HAND` or press `H` to turn on the camera. Moving your hand moves the cursor. Closing your hand into a fist begins a press, and opening it releases the press. To launch a shape, make a fist over its center, pull back, and open your hand.

Allow camera access when prompted. Loading the hand recognition model may require an internet connection.

-  Images and Archive

Click `SAVE/NEXT` or press `S` to save the current image and move on to a new, empty face. The tool also advances automatically when the space reaches 97% capacity. Once you have saved at least one image, press `G` to open the archive. You can download any saved face as a PNG.

The archive is only kept while the page remains open. Download any images you want to keep before refreshing or closing the page.

-  Results and Reflection

I enjoyed the process of launching shapes into the space. I especially liked seeing unexpected colors become neighbors and form new color combinations, and watching compositions and patterns emerge as the shapes accumulated. Instead of planning a finished image from the beginning, I found myself watching how the scene changed each time I added one more shape.

There are also some limitations. Because the next hue is random, it is difficult to plan precise color combinations. The process of turning hand-drawn lines into closed shapes and deforming their outlines where they touch can also feel arbitrary at times. I wanted the shapes to connect like one smooth surface, but in the current results, the boundaries between individual shapes are still visible.

-  AI Use

I developed the concept and determined the interaction and visual direction through repeated testing. I referred to the p5.js examples and references from class while building the sketch. During development, I used ChatGPT to help implement and revise the code, especially for hand recognition, PNG export, and the rotating 3D archive that displays saved images on its faces. ChatGPT also helped with parts of the metaball appearance, collision, color selection, and canvas interface code. I used them for a processing not a result!