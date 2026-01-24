FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY html/static /usr/share/nginx/html/static
COPY html /usr/share/nginx/html/
EXPOSE 80