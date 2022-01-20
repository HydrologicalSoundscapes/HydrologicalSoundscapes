# input data structure

In this file, you'll find the description of the format of input data for the HydroSounds app. Only json formatted data be loaded into the app.

The input data must be an array of `station` objects i.e. objects representing hydrometric stations. a `station` object must have the following structure:
* info:
    * id: identification string
    * label: string
    * lat: number, latitude
    * lon: number, longitude
* data: []


Within the `station` object, `data` is an array containing  variables. A `variable` is structued as follows:
* info: 
    * id: identification string
    * label: string
    * description: string
    * length: number, length of the data
* data: []

# Variables

The variables are currently only computed from daily discharge series.
The current variables considered in the dataset are:
* inter-annual mean of monthly discharge
* coefficient of variations of monthly discharge

