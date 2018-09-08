#!/bin/sh

for size in 16 128 512
do
  inkscape --export-width $size --export-height $size \
           --export-png public/icon$size.png \
           images/icon.svg
done
