#!/usr/bin/env bash

ncftp davidgengenbach <<EOF
cd sites/davidgengenbach/klausuren/sose19
put -R .
EOF
