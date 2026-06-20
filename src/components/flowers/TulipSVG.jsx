export default function TulipSVG({ size = 52, giant = false, hideStem = false }) {
  // Scale the emoji font size to fit nicely
  const emojiSize = size * 0.85

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${emojiSize}px`,
        userSelect: 'none',
        lineHeight: 1,
        filter: 'drop-shadow(0 4px 10px rgba(244,114,182,0.3))'
      }}
    >
      🌷
    </div>
  )
}
