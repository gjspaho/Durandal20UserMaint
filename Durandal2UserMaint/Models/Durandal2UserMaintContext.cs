using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Durandal2UserMaint.Models.Mapping;

namespace Durandal2UserMaint.Models
{
    public partial class Durandal2UserMaintContext : DbContext
    {
        static Durandal2UserMaintContext()
        {
            Database.SetInitializer<Durandal2UserMaintContext>(null);
        }

        public Durandal2UserMaintContext()
            : base("Name=Durandal2UserMaintContext")
        {
        }

        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<webpages_Membership> webpages_Membership { get; set; }
        public DbSet<webpages_OAuthMembership> webpages_OAuthMembership { get; set; }
        public DbSet<webpages_Roles> webpages_Roles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new UserProfileMap());
            modelBuilder.Configurations.Add(new webpages_MembershipMap());
            modelBuilder.Configurations.Add(new webpages_OAuthMembershipMap());
            modelBuilder.Configurations.Add(new webpages_RolesMap());
        }
    }
}
