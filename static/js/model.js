function Model( options ) { return $.extend( this, options ); }

$.extend( Model.prototype, {
    
    url: 'static/data/dataset.json',

    attributes: [
        { name: 'carrierName', type: 'string', columnWidth: 150 },
        { name: 'planName', type: 'string', columnWidth: 150 },
        { name: 'copay', type: 'number', sortingPreference: 'asc', columnWidth: 50 },
        { name: 'premium', type: 'number', sortingPreference: 'asc', columnWidth: 70 },
        { name: 'annualLimit', type: 'number', sortingPreference: 'desc', columnWidth: 100 }
    ],

    getData: function() {

        $.ajax( {
            url: this.url,     
            success: this.handleGetDataSuccess.bind( this ) } );

        return this;
    },

    handleGetDataSuccess: function( response ) {
        this.data = response;
        this.sortDataset();
    },

    sortDataset: function() {

        $.each( this.attributes, this.sortDataByAttribute.bind( this ) );
     
        $('body').trigger('sortedData');

        return this;
    },

    sortDataByAttribute: function( index, attribute ) {

        /* Trying to be a little more readable here by creating `sortFun` variable */
        var sortFun = ( attribute.type === 'number' ) 
            ? function( a, b ) {
                sortLib.byNumber[ attribute.sortingPreference ]( a[ attribute.name ], b[ attribute.name ] ) }
            : function() { };

        this.data.sort( sortFun );
    }
} );
