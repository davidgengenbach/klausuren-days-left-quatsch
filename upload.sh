#!/usr/bin/env bash

ncftp davidgengenbach <<EOF
cd sites/davidgengenbach/klausuren
put -R .
EOF
