# React Hooks ToDo

## Purpose

To demonstrate usage of react hooks

## Docker

In the project directory, you can run

* `docker build . -f .\Dockerfile -t react-hooks:1` - Create an image with the app and runtime (named `react-hooks`, with tag / version `1`)
* `docker images` - Display available images (include `-a` to show all)
  * Copy the `IMAGE ID` from the line with repository=`react-hooks`
* `docker run -p 3000:3000 -it 4afe8ab5f699`
  * Run the image (with open terminal)
  * Expose host port `3000` (first number) as virtual port `3000` (second number)
  * `4afe8ab5f699` is an IMAGE ID

## Available Scripts

In the project directory, you can run

* `npm start`
* `npm test`
* `npm run build`
