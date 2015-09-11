---
title: Seam Carving
subtitle: Content aware image resizing
layout: default
modal-id: seamcarving
project-date: Sept 2014
technologies: [MATLAB]
topics: [Computational photography, dynamic programming, entropy]
description: The goal was to resize images by removing seams in the images that contain the least amount of "energy". Here "energy" is an function that maps pixel locations to values that we define based on what we want to remove from the image. This technique allows us to avoid sacrifice detail when we scale the image. It can also be done automatically, unlike cropping. This method is presented in this paper <a href="http://inst.eecs.berkeley.edu/~cs194-26/fa14/hw/proj4-seamcarving/imret.pdf">Seam Carving for Content-Aware Image Resizing</a>.
date: 2014-09-26
thumbnail: seamcarving/street-reds.gif
teaser-col: 3
gallery-col: 3
teaser:
- src: seamcarving/dp-tea-100.jpg
  alt: dp-tea-100.jpg
- src: seamcarving/enlarged-lanterns-100.jpg
  alt: enlarged-lanterns-100.jpg
- src: seamcarving/enlarged-puppy-100.jpg
  alt: enlarged-puppy-100.jpg
- src: seamcarving/tree-gm-100.jpg
  alt: tree-gm-100.jpg
gallery:
- src: seamcarving/land-250.jpg
  alt: land-250.jpg
- src: seamcarving/newyear-300.jpg
  alt: newyear-300.jpg
- src: seamcarving/concert-200.jpg
  alt: concert-200.jpg
- src: seamcarving/butterfly-200.jpg
  alt: butterfly-200.jpg
---
Below, in the Gallery, are examples of images that have had their widths reduced by 50%. The originals along with the 20% intermediate can be seen <a href="https://inst.eecs.berkeley.edu/~cs194-26/fa14/upload/files/proj4/cs194-dx/"> here</a>. using gradient magnitude seam carving energy function. The gradient magnitude function effectively computes a differential between adjacent pixel values so it allows our dynamic programming algorithm to avoid edges- regions considered to of high energy and particularly noticable to human eyes. As such, low energy seams, that is seams without many edges, will be removed as the image rescales.

Interestingly, we can extrapolate this idea even further. The idea of low and high energy seams can be utilized to expand images and remove objects. All we have to do is define an appropiate energy function. The results and methodology can be seen in the <a href="https://inst.eecs.berkeley.edu/~cs194-26/fa14/upload/files/proj4/cs194-dx/"> original project page </a>.