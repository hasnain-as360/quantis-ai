// Pure light theme per the brief — flat canvas, no colorful blooms (those
// belong to reel 1's brand-film register, not this literal product
// recreation). Just enough of a vignette to keep the very edges from
// feeling like a flat void behind the white UI cards.
export default function Background2() {
  return (
    <div
      className="absolute inset-0 z-0 bg-canvas"
      style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 40%, #FFFFFF 0%, #F8F9FA 70%, #F1F3F5 100%)',
      }}
    />
  )
}
