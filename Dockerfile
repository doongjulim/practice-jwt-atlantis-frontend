FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY html /usr/share/nginx/html/
COPY html/static /usr/share/nginx/html/static
EXPOSE 80