var sortLib = {

    byNumber: {

        asc: function( a, b ) {
            return ( a < b )
                ? -1
                : ( a === b )
                    ? 0
                    : 1; },

        desc: function( a, b ) {
            return ( a < b )
                ? 1
                : ( a === b )
                    ? 0
                    : -1; }
    }
};
