ARG NODE_RELEASE=18

# Build Container for Vue-application
FROM node:${NODE_RELEASE}-bookworm as client-builder

COPY . /web_client
WORKDIR /web_client
RUN npm install
RUN npm run build

# Production environment
FROM nginx:1.25-bookworm
COPY --from=client-builder /web_client/build /usr/share/nginx/html
# Since we use React Router, we need to add `try_files $uri /index.html;`
# to the location directive
RUN echo 'server { \n\
    listen       80; \n\
    listen  [::]:80; \n\
    server_name  localhost; \n\
\n\
    location / { \n\
        root   /usr/share/nginx/html; \n\
        index  index.html index.htm; \n\
        try_files $uri /index.html; \n\
    } \n\
\n\
    error_page   500 502 503 504  /50x.html; \n\
    location = /50x.html { \n\
        root   /usr/share/nginx/html; \n\
    } \n\
} \n\
' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
