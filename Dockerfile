# build stage
FROM node:18-alpine AS build
WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY . .
ENV CI=true
RUN npm run build

# production stage
FROM nginx:stable-alpine
COPY --from=build /src/dist /usr/share/nginx/html
# optional: copy custom nginx.conf if you need routing fallback for SPA
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]