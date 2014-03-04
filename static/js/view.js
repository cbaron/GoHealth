function View( options ) { return $.extend( this, options ); }

/* I used to create and style DOM elements in javascript, but these days I prefer to separate
   them into templating libraries and .css files respectively to separate HTML, JS, CSS.
   However, the challenge had no mention of CSS, so here you go.
*/
$.extend( View.prototype, {

    colors: {
        header: {
            background: 'orange',
            text: 'white'
        },
        row: {
            background: 'lightBlue',
            text: 'black'
       }
    },

    initialize: function() {

        if( this.model.data ) { this.render(); }
        else {
            $('body').on( 'sortedData', this.render.bind(this) );
        }

        return this;
    },

    render: function() {
        this.makeDataTable().showDataTable();
    },

    makeTable: function() {
        return this.table = $('<div></div>',
            { 'css': {
                'display': 'inline-block'
            } } ); },
    
    makeHeaderContainer: function() {
        return this.headerContainer = $( '<div></div>',
            { 'css': {
                'background-color': this.colors.header.background,
                'color': this.colors.header.white
            } } );
    },
    
    makeColumn: function( value, type, width ) {

        return $( '<span>' + value + '</span>' ).css( {
            'text-align': ( type === 'number' ) ? 'right' : 'left',
            'padding': 5,
            'display': 'inline-block' } ).width( width );
    },
    
    makeRowContainer: function() {
        return this.rowContainer = $( '<div></div>',
            { 'css': {
                'background-color': this.colors.row.background,
                'color': this.colors.row.text
            } } );
    },
    
    makeDataTable: function() {

        this.makeTable().append( this.makeHeaderContainer() );

        $.each( this.model.attributes, this.makeHeaderColumn.bind( this ) );

        $.each( this.model.data, this.makeRow.bind( this ) );
            
        return this;
    },

    showDataTable: function() { $('body').append( this.table ); },

    makeHeaderColumn: function( index, attributeMetadata ) {
        this.makeColumn(
            attributeMetadata.name,
            attributeMetadata.type,
            attributeMetadata.columnWidth ).appendTo( this.headerContainer );
    },

    makeRow: function( index, row ) {

        var self = this;

        this.makeRowContainer().append( 
            $.map( this.model.attributes, function( attributeMetadata, i ) {
                return self.makeColumn(
                    row[ attributeMetadata.name ],
                    attributeMetadata.type,
                    attributeMetadata.columnWidth ) } ) ).appendTo( this.table );
    }
} );
