# Input data structure

In this file, you'll find the description of the format of input data for the Hydrological Soundscapes app. Only json formatted data be loaded into the app.

The input data must be an object containing `station` objects i.e. objects representing hydrometric stations. a `station` object must have the following structure:
* info:
    * **id**: identification string
    * **label**: string
    * **lat**: number, latitude
    * **lon**: number, longitude
* data:
    * **monthly_medium**: an array with 12 numbers between 0 and 1; this is typically the interannual average of monthly streamflow expressed in proportion of the sum of the 12 months average streamflow.
    * **monthly_max**: an array with 12 numbers between 0 and 1; this is typically the frequency of yearly maximum daily discharge of each months, computed over all years.
    * **monthly_min**: an array with 12 numbers between 0 and 1; this is typically the frequency of yearly minimum streamflow (e.g. minimum flow of the average of the 30 previous days, i.e. a 30-days rolling mean is applied to the daily streamflow time series before extracting the minimum flow).
    * **monthly_volume**: an array with 12 numbers with no boundaries; this is typically the coefficient of variation of monthly streamflow computed over all years.
    * **size**: one value with no boundary; this is typically the interannual average of yearly mean streamflow or the size of the catchment the hydrometric station is monitoring.

See at the end of the document for an example of such a file.

Such a file can be created from many sources using many different languages. For example, if you're using R, you can use the `rjson` package. Following the documentation of this package, the R object must have a particular structure to result in the desired json file (in particular, **named** list are mandatory). The R object must be a named list containing one named list per station. Each station station must be a named list with an `info` and `data` element. The `data` element must also be a named list with each element being a single numeric value or an array (i.e. `c()`).

# Mapping the data to sounds

The data is mapped to sounds in the following way:

* **monthly_medium**: mapped to piano sounds
* **monthly_max**: mapped to bass sounds (when 0, no sounds are outputted) and their volume, the larger the louder
* **monthly_min**: mapped to hang drum sounds (when 0, no sounds are outputted) and their volume, the larger the louder
* **monthly_volume**: mapped to the volume of piano sounds after normalization (using its max and min)
* **size**: mapped to the BPM of the sound, the larger, the slower.

# Example of input json file

```json
{
	"BR001_14330000_q.csv": {
		"info": {
			"id": "BR001_14330000_q.csv",
			"label": "BR001_14330000_q.csv",
			"lat": -0.2006,
			"lon": -66.8022
		},
		"data": {
			"monthly_medium": [
				0.0519294215608653,
				0.0514008546978245,
				0.0566354170348517,
				0.0736840789353407,
				0.114108371661678,
				0.134031029641102,
				0.133766756718078,
				0.113172181261729,
				0.0854115830711129,
				0.0669799742264019,
				0.0599689517845255,
				0.0589113794064899
			],
			"monthly_max": [
				0,
				0,
				0,
				0.0238095238095238,
				0.119047619047619,
				0.452380952380952,
				0.261904761904762,
				0.0238095238095238,
				0,
				0,
				0.0238095238095238,
				0
			],
			"monthly_min": [
				0.0952380952380952,
				0.357142857142857,
				0.19047619047619,
				0.0714285714285714,
				0,
				0,
				0,
				0,
				0,
				0.0238095238095238,
				0.0238095238095238,
				0.166666666666667
			],
			"monthly_volume": [
				0.376640289182618,
				0.526037326177345,
				0.381696905853731,
				0.283283603435118,
				0.18892651265839,
				0.12016115105687,
				0.154326960662202,
				0.155107212516221,
				0.156882171314227,
				0.227579676605002,
				0.239952887638752,
				0.229416335581053
			],
			"size": 12725.6143436047
		}
	},
	"FR093_M5102010_q.csv": {
		"info": {
			"id": "FR093_M5102010_q.csv",
			"label": "FR093_M5102010_q.csv",
			"lat": 47.192997,
			"lon": -0.374478
		},
		"data": {
			"monthly_medium": [
				0.223663525001981,
				0.253931638343521,
				0.158819324775774,
				0.081892427934328,
				0.0460855957168138,
				0.014079292811492,
				0.00669137952365715,
				0.00295613631231334,
				0.00274772207911603,
				0.0206272262418042,
				0.0510969241573234,
				0.137408807101876
			],
			"monthly_max": [
				0.235294117647059,
				0.333333333333333,
				0.137254901960784,
				0.0392156862745098,
				0.0196078431372549,
				0,
				0,
				0,
				0,
				0.0392156862745098,
				0.0196078431372549,
				0.176470588235294
			],
			"monthly_min": [
				0.0196078431372549,
				0,
				0,
				0,
				0,
				0.0196078431372549,
				0.0392156862745098,
				0.137254901960784,
				0.549019607843137,
				0.215686274509804,
				0.0196078431372549,
				0
			],
			"monthly_volume": [
				0.940577841035822,
				0.942824609222314,
				0.919921306310525,
				1.44720877644962,
				1.37421481963716,
				1.58229762715552,
				1.9856388692981,
				2.34453767267419,
				2.03259079570507,
				2.82547451994117,
				1.61326097761636,
				1.25091470029029
			],
			"size": 0.975804600219058
		}
	},
	"NO002_N002.013_q.csv": {
		"info": {
			"id": "NO002_N002.013_q.csv",
			"label": "NO002_N002.013_q.csv",
			"lat": 61.560272,
			"lon": 8.927067
		},
		"data": {
			"monthly_medium": [
				0.0111341687619976,
				0.00927481789975443,
				0.00793488337054628,
				0.01026292706517,
				0.08792308753947,
				0.241082536177691,
				0.240885604487932,
				0.170544651387124,
				0.112038446006211,
				0.0659383130660074,
				0.0280005761645792,
				0.0149799880735173
			],
			"monthly_max": [
				0,
				0,
				0,
				0,
				0.0232558139534884,
				0.406976744186047,
				0.325581395348837,
				0.0232558139534884,
				0.0465116279069767,
				0.0232558139534884,
				0,
				0
			],
			"monthly_min": [
				0.0581395348837209,
				0.0348837209302326,
				0.104651162790698,
				0.488372093023256,
				0.127906976744186,
				0,
				0,
				0,
				0,
				0,
				0,
				0.0465116279069767
			],
			"monthly_volume": [
				0.281396399317865,
				0.298365652842868,
				0.460600517372786,
				0.727387920646114,
				0.596016934205224,
				0.240708814805266,
				0.229408945637129,
				0.216847190188864,
				0.407984279674563,
				0.483135492959989,
				0.641418662440289,
				0.352817387635601
			],
			"size": 18.3414207627832
		}
	},
	"US062_U02011460_q.csv": {
		"info": {
			"id": "US062_U02011460_q.csv",
			"label": "US062_U02011460_q.csv",
			"lat": 38.245401,
			"lon": -79.768663
		},
		"data": {
			"monthly_medium": [
				0.118503741905634,
				0.116593618758457,
				0.181135616728578,
				0.135121245031222,
				0.118750280925486,
				0.0555378550468862,
				0.0257191525526713,
				0.0196254627285886,
				0.0245304868015358,
				0.0331412893183017,
				0.070971883308967,
				0.100369366893672
			],
			"monthly_max": [
				0.214285714285714,
				0.0476190476190476,
				0.19047619047619,
				0.214285714285714,
				0.142857142857143,
				0.0238095238095238,
				0,
				0,
				0,
				0.0476190476190476,
				0.0952380952380952,
				0.0238095238095238
			],
			"monthly_min": [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0.19047619047619,
				0.380952380952381,
				0.30952380952381,
				0.119047619047619,
				0
			],
			"monthly_volume": [
				0.672046815828772,
				0.557408136235886,
				0.439701140184006,
				0.55186059860074,
				0.543150374977228,
				0.851956352239897,
				0.829815800878868,
				1.07682092404558,
				1.53396826273339,
				1.33993371522993,
				1.13013268614578,
				0.536222204811475
			],
			"size": 2.58827785409908
		}
	}
}
```
