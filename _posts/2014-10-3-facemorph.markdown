---
title: Face Morphing
subtitle: Seamlessly morph between faces  
layout: default
modal-id: facemorphing
project-date: Oct 2014
technologies: [MATLAB]
topics: [Computational photography,  Delaunay triangulation, inverse warping]
description: Morphed faces from using inverse warping, created "average" faces, extrapolated faces to make caricatures
date: 2014-10-03
thumbnail: facemorph/karp2fish.gif
teaser-col: 2
gallery-col: 3
teaser:
- src: facemorph/avg_chinese.jpg
  alt: avg_chinese.jpg
- src: facemorph/2-warp.jpg
  alt: 2-warp.jpg
- src: facemorph/4-warp.jpg
  alt: 4-warp.jpg
- src: facemorph/6-warp.jpg
  alt: 6-warp.jpg
- src: facemorph/8-warp.jpg
  alt: 8-warp.jpg
- src: facemorph/avg_eng.jpg
  alt: avg_eng.jpg
gallery:
- src: facemorph/heath2joker.gif
  alt: heath2joker.gif
- src: facemorph/karp2fish.gif
  alt: karp2fish.gif
- src: facemorph/efros2snoop.gif
  alt: efros2snoop.gif
- src: facemorph/ava2howard.gif
  alt: ava2howard.gif
---
The whole goal of this project was to master the idea that images, along with their color, edges, and geometry, can be treated like any other mathematical object. That is, they can be interpolated and averaged. Though this is a oversimplification, we can use this idea take warp faces together, create the "mean" face of a demographic, extrapolate faces to make caricaturs, and even extrapolate faces through gender, race, and age. Now let's go in more detail. For exaple, morphing was done by:
<ol>
	<li>Manually choosing control points on the source and destination images.</li>
	<li>Computing an weighted average geometry between the soure and destination image. This was done by taking the sum of (1-t)*source_pixels and t*destination_pixels. The weights are normalized to sum to t.</li>
	<li>Finding the Delaunay triangulation for one of the set of xy control points and using the same triangluation for the other set of control points.</li>
	<li>Calculating the affine transformation needed to warp all triangles in the weighted average image their corresponding triangles in the source image. Likewise, affines were found to map weight average triangles to the destination image.</li>
	<li>Using t-search to categorize every pixel in the average image under the one of the triangles in step 3. As we do this we can look up the affine transformations we found in step 4 to color this pixel using inverse warping.</li>
	<li>Repeat this for a bunch of t's in a continuous range, lets say [0, 1] to create a smooth animation from source to destination image.</li>
</ol>
The results of face morphing are shown below. If you'd like to know more the full project page can be seen at my <a href="https://inst.eecs.berkeley.edu/~cs194-26/fa14/upload/files/proj5/cs194-dx/"> original project page </a>.