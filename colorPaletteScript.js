function rgbToHex(rgb) {
    const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
    return result ? "#" + ((1 << 24) + (parseInt(result[1]) << 16) + (parseInt(result[2]) << 8) + parseInt(result[3])).toString(16).slice(1).toUpperCase() : null;
}

function initializeColorPickers(palette) {
    var colorPalettes = {
        // blue
        "palette_blue": ["rgb(251, 251, 251)", "rgb(130, 192, 251)", "rgb(91, 167, 237)", "rgb(61, 133, 198)", "rgb(11, 83, 148)", "rgb(7, 55, 99)"],
        // Floating Rainforest Color Palette by lilabirby
        "palette_green": ["rgb(251, 251, 251)", "rgb(24,46,21)", "rgb(22,52,26)", "rgb(28,74,45)", "rgb(18,75,24)", "rgb(18,92,37)"],
    }
    var colorPickers = [
        document.getElementById("colorPicker1"),
        document.getElementById("colorPicker2"),
        document.getElementById("colorPicker3"),
        document.getElementById("colorPicker4"),
        document.getElementById("colorPicker5"),
        document.getElementById("colorPicker6")
    ];

    for (var i = 0; i < colorPickers.length; i++) {
        colorPickers[i].value = rgbToHex(colorPalettes[palette][i]);
    }
}
initializeColorPickers("palette_blue")
