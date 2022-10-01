function popupLayer(layerId) {
    $("#" + layerId).fadeIn();
    $contents = $("#" + layerId).find(".pop-layer");

    var $elWidth = ~~$contents.outerWidth(),
        $elHeight = ~~$contents.outerHeight();

    $contents.css({
        marginTop: -$elHeight / 2,
        marginLeft: -$elWidth / 2,
    });
    $contents.find(".btn-layerClose").click(function () {
        $("#" + layerId).fadeOut();
    });
}
