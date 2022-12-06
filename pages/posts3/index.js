import {Component} from 'react';

export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        };
        this.postAddHandle = this.postAddHandle.bind(this);
        
    }

    componentDidMount() {
        this.fetchPosts();
    }

    postAddHandle(event){
        event.preventDefault();
        const title = event.target.elements.title.value;
        const body = event.target.elements.body.value;

        const recentId = this.state.data[this.state.data.length-1]['id']
        const post = {
            title: title,
            body: body,
            id: recentId + 1
        };
        const newPosts = this.state.data.concat(post);
        this.setState({data: newPosts});
    }

    render() {
        if (!this.state.data) return <p>No POSTS fetched</p>
        return (
            <div>
                <h1 className="font-bold text-2xl m-2">ADD POSTS</h1>
                <form onSubmit={this.postAddHandle} className="w-2/5">
                    <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="title" placeholder="Title" />
                    <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="body" placeholder="Body" />
                    <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" type="submit">Add post</button>
                </form>


                <h1 className="font-bold text-2xl m-2">POSTS</h1>
                {this.state.data.map(post =>
                    <div className="m-2 rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{post.title}</div>
                        <p className="text-gray-700 text-base"> {post.body} </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#{post.id}</span>
                    </div>
                    </div>
                )}
            </div>
            )
        }

    async fetchPosts() {
        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/posts")
          const postJson = await response.json();
          this.setState({data: postJson})
        } catch (error) {
          console.log(error)
        }
      } 
}