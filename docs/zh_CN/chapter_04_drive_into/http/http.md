# Mapping between Mojo and HTTP





Http related Attributes



```
attribute http.post {
	path
	body
	headers
}
```



```
attribute http.body
```



```
attribute http.query
attribute http.header('X-total', `{}`)
attribute http.fragment
```



```
interface Tracking {
    @http.post{headers: ['X-Mehtod: GET']}
    @http.head()
    add_track(track:Track @1 @http.body()
              channel:String @2 @http.query('ch') //< 制定某个特定的`topic`
             ) -> Status

    @http.post("")
    add_track_set(track_set:TrackSet, channel:String) -> Result<Track>
}
```



```protobuf
message AddTrackRequest {
}

message AddTrackResponse {
}
```



```go
type AddTrackRequestCodec struct {
}

func (a *AddTrackRequestCodec) Encode(track Track, channel string) HttpRequest

func (a *AddTrackRequestCodec) Decode(request HttpRequest) *AddTrackRequest
```





分页的控制

