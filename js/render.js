// Земи JSON и претвори го во објекти
var json_data = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "json/pomiluvanja.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var pomiluvani = json_data.pomiluvani;
var site_odluki = [];
var site_pomiluvani = [];
var vkupno_odluki = 0;
var izvor = json_data._izvor;
var najpomiluvano_lice = '';
var broevi_na_odluki_html = '';
var max_odluki = 0;

$(pomiluvani).each(function () {
    site_odluki = site_odluki.concat(this.odluki);
    site_pomiluvani = site_pomiluvani.concat(this.ime_prezime);

    vkupno_odluki = uniq(site_odluki).length;
    vkupno_pomiluvani = uniq(site_pomiluvani).length;

    // Најди го најголемиот број на одлуки од бројот на сите одлуки за помилување
    if (this.odluki.length > max_odluki) {
        max_odluki = this.odluki.length;
    }

    // Најди го најпомилуваното лице
    if (this.odluki.length === max_odluki) {
        najpomiluvano_lice = this.ime_prezime;
    }

    $('.pomuluvani').append("<tr><td class='col-md-4'>" + this.ime_prezime + "</td><td class='col-md-2'>" + this.grad + "</td><td class='col-md-2'>" + this.odluki.length + "</td>" + broevi_na_odluki_html + "<td class='col-md-4'>" + this.odluki + "</td></tr>");
});

$('.vkupno-odluki').html(vkupno_odluki);
$('.vkupno-pomiluvani').html(vkupno_pomiluvani);
$('.izvor').html(izvor);
$('.najpomiluvano-lice').html(najpomiluvano_lice);

http://stackoverflow.com/a/979325/3190066
        function sort_by(field, reverse, primer) {

            var key = primer ?
                    function (x) {
                        return primer(x[field]);
                    } :
                    function (x) {
                        return x[field];
                    };

            reverse = !reverse ? 1 : -1;

            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            };
        }

// http://stackoverflow.com/a/9229821/3190066
function uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
        return !pos || item !== ary[pos - 1];
    });
}