# HTML Shadertoy Basic Template

This template allow you to use your Shadertoy shaders in a classic html page.

It only supports one shader (no multiple chanels like Shadertoy can do) and not all Shadertoy variables are available yet.

## How to use

- Put your shader in `shader.frag`, don't erease everything, follow the comments.
- Set your title and thumbnail in `index.htm`

## Testing

To test your shader and see your changes, you will need a local web server.

The simplest solution I use is to install Python 3 and run `python -m http.server` in the folder where `index.html` is. Then you can see your are in your browser by going to `localhost:8000`.

Make sure to disable cache in the Inspector Network tab of your browser to see your shader changes.