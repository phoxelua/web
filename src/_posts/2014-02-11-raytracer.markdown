---
title: Ray Tracer
subtitle: Generate images of virtual objects
layout: default
modal-id: raytracer
project-date: February 2014
technologies: [C++, OpenGL]
topics: [Graphics, environment mapping, aliasing, depth of field]
description: Implemented a recursive, parallel ray tracer from scratch with full production level features that included anti-aliasing, reflection, refraction, environment mapping, and depth of field.
date: 2014-02-11
teaser-col: 3
gallery-col: 3
teaser:
- src: raytracer/image-02.jpg
  alt: image-02.jpg
- src: raytracer/image-07.jpg
  alt: image-07.jpg
- src: raytracer/image-03.jpg
  alt: image-03.jpg
- src: raytracer/image-06.jpg
  alt: image-06.jpg
gallery:
- src: raytracer/image-05.jpg
  alt: image-05.jpg
- src: raytracer/image-08.jpg
  alt: image-08.jpg
- src: raytracer/image-09.jpg
  alt: image-09.jpg
- src: raytracer/image-10.jpg
  alt: image-10.jpg
thumbnail: raytracer/image-01.jpg
---

         
So what is ray tracing? Ray tracing, in a nutshell, is a recursive technique used to color an image and make pretty pictures. The basic algorithm goes like this: for every pixel, shoot out an "eye ray" and let it bounce around your virtual scene- once the eye ray is done bouncing, color the pixel according to the colors the eye ray picks up along the way. If that doesn't make sense, think of the eye ray as a snowball. For every pixel, you throw a snowball. This is a elastic snowball so it'll bounce around the scene- whenever it hits something the snowball gets slightly stained by the objects color. For example, if the snowball hits a red object and then a blue object- it should be colored magenta. Once the snowball finishes bouncing- that's the color I decide to color my pixel. This is a really rough analogy- there are many caveats but many simplifications were made for explanation purposes. You might notice that this is actually "backwards" to how real life works: 

<ul>
    <li>In real life, light strikes an object and bounces around a scene until it reaches your eye. </li>
    <li>In ray tracing, your eye sends out a pretend ray and <em>it</em> bounces around until it reaches a light source.</li>
</ul>