# Answers for Part 3

## Answer to question 1A

- `COPY . . ` copies all files from the working directory into the image, including files like `.env`, `node_modules`, test data, and others. This bloats the image, slows build times, and, worst of all, leaks secrets if pushed to a registry.

- Dependencies are installed and the application is run in the same image. This causes the final image to be large which increases its download time. Moreover, installing dependencies in the same image can cause developer dependencies to be accidentally shipped to production.

- No `NODE_ENV=production` is set. This causes all dependencies (including developer ones) to be installed and used.

- File name should be "Dockerfile" and not "dockerfile" — the first letter is *always* a capital "D". Not respecting this convention can lead to unexpected behaviour.

## Answer to question 1B

- Be explicit in specifying the files that need to be copied, e.g. `COPY ./x.js .`. Alternatively, add a `.dockerignore` file to ignore sensitive or unnecessary files and avoid copying them.

- Use multi-stage builds to ensure that only the necessary set of files are included in the final image.

- Set `NODE_ENV=production` before installing dependencies to ensure developer dependencies are excluded.

- Rename the file from "dockerfile" to "Dockerfile"

## Answer to question 2B

Inside the frontend container, `localhost` refers to the frontend container _itself_, and *not* the backend container. Therefore, when attempting to access `http://localhost:3000/api/courses`, the request fails because there is not such API running on the frontend container on port 3000.

To get around this, Docker Compose creates a shared internal network where services can communicate to one another using their respective service names. Therefore, requests like these:

`http://localhost:3000/api/courses`

become:

`http://backend:3000/api/courses`

Note that "backend" has replaced "localhost" and that the name "backend" indeed comes from the compose.yml file where the backend service was named as such.

Finally, you might be wondering: how do I make my frontend code mode dynamic so that every time I package it in Docker I don't have to change the URLs manually? The answer is to make your URLs environment-driven. This means that, in production, you set an environment variable, e.g. `HOST`, that specifies the host as `backend`. Then, in your frontend code, you can use:

```
const host_name = process.env.HOST || 'localhost';
const BASE_URL  = http://${host_name}:3000/api
```