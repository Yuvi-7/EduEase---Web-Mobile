#!/bin/bash
# Downloads required fonts into assets/fonts/
# Run once after cloning: bash scripts/download-fonts.sh

set -e
FONTS_DIR="$(dirname "$0")/../assets/fonts"
mkdir -p "$FONTS_DIR"

echo "Downloading Inter..."
INTER_BASE="https://github.com/rsms/inter/raw/master/docs/font-files"
curl -sL "$INTER_BASE/Inter-Regular.woff2" -o /tmp/Inter-Regular.woff2 || true
# Use google-webfonts-helper or direct GitHub releases for TTF
INTER_RELEASE="https://github.com/rsms/inter/releases/download/v4.0"
curl -sL "$INTER_RELEASE/Inter-4.0.zip" -o /tmp/inter.zip
unzip -j /tmp/inter.zip "*/Inter-*.ttf" -d /tmp/inter_ttf 2>/dev/null || true
for variant in Regular Medium SemiBold Bold; do
  [ -f "/tmp/inter_ttf/Inter-$variant.ttf" ] && cp "/tmp/inter_ttf/Inter-$variant.ttf" "$FONTS_DIR/" && echo "  ✓ Inter-$variant.ttf"
done

echo "Downloading Space Grotesk..."
SG_RELEASE="https://github.com/floriankarsten/space-grotesk/releases/download/3.0.0"
curl -sL "$SG_RELEASE/SpaceGrotesk-3.0.0.zip" -o /tmp/sg.zip
unzip -j /tmp/sg.zip "*/static/SpaceGrotesk-*.ttf" -d /tmp/sg_ttf 2>/dev/null || true
for variant in SemiBold Bold; do
  [ -f "/tmp/sg_ttf/SpaceGrotesk-$variant.ttf" ] && cp "/tmp/sg_ttf/SpaceGrotesk-$variant.ttf" "$FONTS_DIR/" && echo "  ✓ SpaceGrotesk-$variant.ttf"
done

echo "Downloading JetBrains Mono..."
JBM_RELEASE="https://github.com/JetBrains/JetBrainsMono/releases/download/v2.304"
curl -sL "$JBM_RELEASE/JetBrainsMono-2.304.zip" -o /tmp/jbm.zip
unzip -j /tmp/jbm.zip "*/JetBrainsMono-Regular.ttf" -d /tmp/jbm_ttf 2>/dev/null || true
[ -f "/tmp/jbm_ttf/JetBrainsMono-Regular.ttf" ] && cp "/tmp/jbm_ttf/JetBrainsMono-Regular.ttf" "$FONTS_DIR/" && echo "  ✓ JetBrainsMono-Regular.ttf"

echo ""
echo "Done! Fonts saved to $FONTS_DIR"
ls -1 "$FONTS_DIR"
