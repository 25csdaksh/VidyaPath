const {
  Project,
  Book,
  Course,
  InterviewQuestion,
  Resource,
  Hackathon,
  Announcement,
  Roadmap,
} = require('../models');
const { escapeRegex } = require('../utils/sanitize');

class SearchService {
  static async searchAll(queryString) {
    if (!queryString || typeof queryString !== 'string' || queryString.trim().length === 0) {
      return {
        query: '',
        totalResults: 0,
        results: {
          projects: [],
          books: [],
          courses: [],
          interviews: [],
          resources: [],
          hackathons: [],
          announcements: [],
          roadmap: [],
        },
      };
    }

    const term = queryString.trim();
    const regex = new RegExp(escapeRegex(term), 'i');

    const [
      projects,
      books,
      courses,
      interviews,
      resources,
      hackathons,
      announcements,
      roadmap,
    ] = await Promise.all([
      Project.find({
        status: 'Published',
        $or: [{ title: regex }, { description: regex }, { category: regex }],
      })
        .limit(6)
        .select('title slug category difficulty description'),

      Book.find({
        $or: [{ title: regex }, { description: regex }, { authors: regex }, { category: regex }],
      })
        .limit(6)
        .select('title authors category level coverImageUrl officialUrl'),

      Course.find({
        $or: [{ title: regex }, { description: regex }, { provider: regex }, { category: regex }],
      })
        .limit(6)
        .select('title provider category difficulty url rating'),

      InterviewQuestion.find({
        $or: [{ question: regex }, { topic: regex }, { category: regex }, { tags: regex }],
      })
        .limit(6)
        .select('question category topic difficulty'),

      Resource.find({
        $or: [{ title: regex }, { description: regex }, { category: regex }, { type: regex }],
      })
        .limit(6)
        .select('title slug type category url'),

      Hackathon.find({
        $or: [{ name: regex }, { organizer: regex }, { description: regex }],
      })
        .limit(6)
        .select('name organizer status mode registrationDeadline registrationUrl'),

      Announcement.find({
        isBroadcast: true,
        $or: [{ title: regex }, { description: regex }, { category: regex }],
      })
        .limit(6)
        .select('title category priority actionUrl createdAt'),

      Roadmap.find({
        isActive: true,
        $or: [{ title: regex }, { description: regex }, { year: regex }],
      })
        .limit(6)
        .select('title slug year semester description'),
    ]);

    const totalResults =
      projects.length +
      books.length +
      courses.length +
      interviews.length +
      resources.length +
      hackathons.length +
      announcements.length +
      roadmap.length;

    return {
      query: term,
      totalResults,
      results: {
        projects,
        books,
        courses,
        interviews,
        resources,
        hackathons,
        announcements,
        roadmap,
      },
    };
  }
}

module.exports = SearchService;
