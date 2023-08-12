#!/bin/sh

sleep 1
make migrate
exec "$@"