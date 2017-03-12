$(function() {
    function(){function n(n){return d3.merge(e.map(function(t){var o=r(t[0],t[1]),u=r(t[0],t[2]),i=[];i.push([t[0],o(1/n),u(1/n)]);for(var a=1;n>a;++a){for(var e=r(o(a/n),u(a/n)),c=r(o((a+1)/n),u((a+1)/n)),f=0;a>=f;++f)i.push([e(f/a),c(f/(a+1)),c((f+1)/(a+1))]);for(var f=0;a>f;++f)i.push([e(f/a),c((f+1)/(a+1)),e((f+1)/a)])}return i}))}function t(t){function r(n,t){var r;(n[0]<t[0]||n[0]==t[0]&&(n[1]<t[1]||n[1]==t[1]&&n[2]<t[2]))&&(r=n,n=t,t=r),u[n.map(o)+" "+t.map(o)]=[n,t]}function o(n){return d3.round(n,4)}var u={};return n(t).forEach(function(n){r(n[0],n[1]),r(n[1],n[2]),r(n[2],n[0])}),d3.values(u)}function r(n,t){var r=n[0],o=n[1],u=n[2],i=t[0]-r,a=t[1]-o,e=t[2]-u;return function(n){return[r+n*i,o+n*a,u+n*e]}}function o(n){var t=n[0],r=n[1],o=n[2];return[Math.atan2(r,t)*i,Math.acos(o/Math.sqrt(t*t+r*r+o*o))*i-90]}var u=1.618033988749895,i=180/Math.PI,a=[[1,u,0],[-1,u,0],[1,-u,0],[-1,-u,0],[0,1,u],[0,-1,u],[0,1,-u],[0,-1,-u],[u,0,1],[-u,0,1],[u,0,-1],[-u,0,-1]],e=[[0,1,4],[1,9,4],[4,9,5],[5,9,3],[2,3,7],[3,2,5],[7,10,2],[0,8,10],[0,4,8],[8,2,10],[8,4,5],[8,5,2],[1,0,6],[11,1,6],[3,9,11],[6,10,7],[3,11,7],[11,6,7],[6,0,10],[9,1,11]].map(function(n){return n.map(function(n){return a[n]})});d3.geodesic={multipolygon:function(t){return{type:"MultiPolygon",coordinates:n(~~t).map(function(n){return n=n.map(o),n.push(n[0]),n=[n]})}},polygons:function(n){return d3.geodesic.multipolygon(~~n).coordinates.map(function(n){return{type:"Polygon",coordinates:n}})},multilinestring:function(n){return{type:"MultiLineString",coordinates:t(~~n).map(function(n){return n.map(o)})}}}}();

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});


