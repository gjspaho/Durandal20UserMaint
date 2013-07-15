using System;
using System.Web.Optimization;

namespace Durandal2UserMaint
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            var vendorScriptBundle = new ScriptBundle("~/bundles/vendor")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/jquery-ui-{version}.js")
                .Include("~/scripts/sammy-{version}.js")
                .Include("~/scripts/knockout-{version}.js")
                .Include("~/scripts/q.min.js")
                .Include("~/scripts/toastr.js")
                .Include("~/scripts/moment.js")
                .Include("~/Scripts/jquery.unobtrusive*")
                .Include("~/Scripts/jquery.validate*")
                .Include("~/Scripts/bootstrap.js")
                ;

            vendorScriptBundle.ConcatenationToken = Environment.NewLine;

            bundles.Add(vendorScriptBundle);

            var modernizrScriptBundle = new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/modernizr-*");

            modernizrScriptBundle.ConcatenationToken = Environment.NewLine;

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(modernizrScriptBundle);

            bundles.Add(new StyleBundle("~/Content/css")
                .Include("~/Content/ie10mobile.css")
                .Include("~/Content/bootstrap.css")
                .Include("~/Content/bootstrap-responsive.css")
                .Include("~/Content/site.css")
                .Include("~/Content/durandal.css")
                .Include("~/Content/font-awesome.min.css")
                .Include("~/Content/toastr.css")
                .Include("~/Content/starterkit.css")
                );

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}