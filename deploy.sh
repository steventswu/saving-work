#!/bin/bash
VERSION_INFO=$(git describe master --tags)
VERSION=$(echo $VERSION_INFO | sed -e 's/^v//')

docker build . --tag gcr.io/tg2018-ico/nginx-cap:$VERSION
docker push gcr.io/tg2018-ico/nginx-cap:$VERSION
kubectl set image deploy/nginx-cap nginx-cap=gcr.io/tg2018-ico/nginx-cap:$VERSION
