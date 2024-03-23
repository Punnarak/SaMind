<template>
  <v-col class="px-10">
    <v-row align="center">
      <v-col cols="3" style="font-weight: 600"> LIBRARY </v-col>
      <v-col class="calendar-type" cols="4" align="center">
        <button @click="(menu = 'carousel'), dataEachMenu()">CAROUSEL</button>
        <button @click="(menu = 'tip'), dataEachMenu()">TIP</button>
        <button @click="(menu = 'link'), dataEachMenu()">LINK</button>
      </v-col>
    </v-row>
    <v-col class="px-10" v-if="menu == 'carousel'">
      <v-row align="center">
        <v-col cols="3" style="font-weight: 600"> Manage Carousel </v-col>
        <v-col cols="5">
          <v-text-field
            class="mt-2"
            density="comfortable"
            rounded="xl"
            variant="outlined"
            placeholder="Search Carousel"
            prepend-inner-icon="mdi-magnify"
            v-model="searchCarousel"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <v-btn
            rounded="xl"
            class="text-none"
            color="#569AFF"
            size="x-large"
            variant="flat"
            style="font-family: 'Inter', 'sans-serif'"
            @click="clear(), (createCarouselPopup = true)"
          >
            <v-icon>mdi-file-document-outline</v-icon>Create Carousel</v-btn
          >
        </v-col>
      </v-row>
      <v-data-table
        rounded="xl"
        v-model:page="carouselPage"
        :headers="carouselHeader"
        :items="filteredCarousel"
        :items-per-page="carouselPerPage"
        class="elevation-1"
        style="border-radius: 10px"
      >
        <template v-slot:item.imageUrl="{ item }">
          <img
            :src="item.columns.imageUrl"
            style="width: 275px; height: 190px"
          />
        </template>
        <template v-slot:item.title="{ item }"
          ><label class="title-label">{{ showLink(item.columns.title) }}</label>
        </template>
        <template v-slot:item.url="{ item }"
          ><label class="url-label">{{ showLink(item.columns.url) }}</label>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            icon="mdi-magnify"
            color="blue"
            size="30px"
            style="margin-right: 20px"
            @click="openNewTab(item.columns.url)"
          />
          <v-btn
            icon="mdi-pencil"
            color="blue"
            size="30px"
            style="margin-right: 20px"
            @click="handleEditCarousel(item.columns), (select = item)"
          />
          <v-btn
            icon="mdi-delete"
            color="blue"
            size="30px"
            @click="(deletePopup = true), (select = item)"
          />
          <Transition name="edit-carousel-modal">
            <div v-if="editCarouselPopup" class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container createcarousel">
                  <div class="modal-header create-popup-header" align="start">
                    <slot
                      class="popupheader"
                      style="font-weight: bolder"
                      name="header"
                      >Create Carousel
                    </slot>
                    <v-icon @click="editCarouselPopup = false"
                      >mdi-close</v-icon
                    >
                  </div>

                  <div class="modal-body" align="left" style="left: 100px">
                    <slot name="body">
                      <v-col>
                        <div
                          style="
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                          "
                        >
                          <div class="text-fields mr-4">
                            <div class="TherapistId">
                              <label class="text title">Title</label>
                              <v-col
                                style="margin-top: -10px; margin-left: -10px"
                              >
                                <v-text-field
                                  class="custom-placeholder mt-2"
                                  density="comfortable"
                                  rounded="lg"
                                  variant="outlined"
                                  placeholder="Enter Title"
                                  style="
                                    width: 400px;
                                    height: 45px;
                                    flex-shrink: 0;
                                    margin-bottom: 8px;
                                  "
                                  v-model="title"
                                  :rules="titleValidation"
                                >
                                </v-text-field>
                              </v-col>
                              <div class="url">
                                <label class="text title">URL</label>
                                <v-col
                                  style="margin-top: -10px; margin-left: -10px"
                                >
                                  <v-text-field
                                    class="custom-placeholder mt-2"
                                    density="comfortable"
                                    rounded="lg"
                                    variant="outlined"
                                    placeholder="Enter URL"
                                    style="
                                      width: 400px;
                                      height: 45px;
                                      flex-shrink: 0;
                                      margin-bottom: 8px;
                                    "
                                    v-model="url"
                                    :rules="urlValidation"
                                  >
                                  </v-text-field>
                                </v-col>
                              </div>
                              <div class="imageurl">
                                <label class="text title">Image Link</label>
                                <v-col
                                  style="margin-top: -10px; margin-left: -10px"
                                >
                                  <v-text-field
                                    class="custom-placeholder mt-2"
                                    density="comfortable"
                                    rounded="lg"
                                    variant="outlined"
                                    placeholder="Enter Image URL"
                                    style="
                                      width: 400px;
                                      height: 45px;
                                      flex-shrink: 0;
                                      margin-bottom: 8px;
                                    "
                                    v-model="imageUrl"
                                    :rules="imageUrlValidation"
                                  >
                                  </v-text-field>
                                </v-col>
                              </div>
                            </div>
                          </div>
                          <v-col v-if="imageUrl !== ''">
                            <img
                              :src="imageUrl"
                              style="width: 375px; height: 290px"
                            />
                          </v-col>
                        </div>
                      </v-col>
                    </slot>
                  </div>
                  <div
                    class="modal-footer"
                    style="
                      display: flex;
                      justify-content: flex-end;
                      margin-top: 50px;
                    "
                  >
                    <slot name="footer">
                      <v-col cols="4">
                        <v-btn
                          rounded="xl"
                          class="text-none mx-auto"
                          color="#569AFF"
                          block
                          size="large"
                          variant="flat"
                          style="
                            color: #fff;
                            font-size: 15px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: normal;
                            letter-spacing: 0.13px;
                            margin-top: -40px;
                          "
                          @click="handleUpdateCarousel()"
                        >
                          Edit Carousel</v-btn
                        >
                      </v-col>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <Transition name="delete-modal">
            <div v-if="deletePopup" class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container delete">
                  <div class="modal-header" align="left">
                    <slot class="popupheader" name="header"
                      >Confirm delete</slot
                    >
                  </div>
                  <v-divider
                    class="mt-3"
                    color="black"
                    style="opacity: 1"
                  ></v-divider>
                  <div class="modal-body" style="margin-top: 6px" align="left">
                    <slot name="body"
                      >Are you sure you want to delete :
                      {{ select.columns.title }} ?</slot
                    >
                  </div>

                  <div class="modal-footer" style="margin-bottom: 40px">
                    <slot name="footer">
                      <button
                        class="modal-default-button"
                        style="color: red"
                        @click="Delete(item, select), (deletePopup = false)"
                      >
                        Delete
                      </button>
                      <button
                        class="modal-default-button mr-5"
                        style="color: #00bf63"
                        @click="deletePopup = false"
                      >
                        Cancel
                      </button>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </template>

        <template v-slot:bottom>
          <v-row class="pt-2 px-2">
            <v-col cols="auto">
              <v-select
                variant="solo-filled"
                :hide-details="true"
                flat
                :items-per-page="carouselPerPage"
                v-model="carouselPerPage"
                :items="[10, 20, 30, 40, 50]"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-pagination
                active-color="primary"
                v-model="carouselPage"
                :length="2"
              ></v-pagination>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-col>
    <v-col class="px-10" v-if="menu == 'tip'">
      <v-row align="center">
        <v-col cols="3" style="font-weight: 600"> Manage Tip </v-col>
        <v-col cols="5">
          <v-text-field
            class="mt-2"
            density="comfortable"
            rounded="xl"
            variant="outlined"
            placeholder="Search Tip"
            prepend-inner-icon="mdi-magnify"
            v-model="searchTip"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2">
          <v-btn
            rounded="xl"
            class="text-none mx-auto"
            color="#569AFF"
            block
            size="x-large"
            variant="flat"
            style="font-family: 'Inter', 'sans-serif'"
            @click="clear(), (createTipPopup = true)"
          >
            <v-icon>mdi-file-document-outline</v-icon>Create Tip</v-btn
          >
        </v-col>
      </v-row>
      <v-data-table
        rounded="xl"
        v-model:page="tipPage"
        :headers="tipHeader"
        :items="filteredTip"
        :items-per-page="tipPerPage"
        class="elevation-1"
        style="border-radius: 10px"
      >
        <template v-slot:item.title="{ item }"
          ><label class="title-label">{{ showLink(item.columns.title) }}</label>
        </template>
        <template v-slot:item.imageUrl="{ item }">
          <img
            :src="item.columns.imageUrl"
            style="width: 188px; height: 237px"
          />
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            icon="mdi-magnify"
            color="blue"
            size="30px"
            style="margin-right: 20px"
            @click="(viewTipPopup = true), (select = item)"
          />
          <v-btn
            icon="mdi-pencil"
            color="blue"
            size="30px"
            style="margin-right: 20px"
            @click="handleEditTip(item.columns), (select = item)"
          />
          <v-btn
            icon="mdi-delete"
            color="blue"
            size="30px"
            @click="(deletePopup = true), (select = item)"
          />

          <Transition name="view-tip-modal">
            <div v-if="viewTipPopup" class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container viewtip">
                  <div class="modal-header create-popup-header" align="start">
                    <slot
                      class="popupheader"
                      style="font-weight: bolder"
                      name="header"
                      >Tip: {{ select.columns.title }}
                    </slot>
                    <v-icon @click="viewTipPopup = false">mdi-close</v-icon>
                  </div>

                  <div class="modal-body" align="center">
                    <slot name="body">
                      <img
                        :src="select.columns.imageUrl"
                        style="width: 388px; height: 437px"
                      />
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <Transition name="edit-tip-modal">
            <div v-if="editTipPopup" class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container createtip">
                  <div class="modal-header create-popup-header" align="start">
                    <slot
                      class="popupheader"
                      style="font-weight: bolder"
                      name="header"
                      >Create Tip
                    </slot>
                    <v-icon @click="editTipPopup = false">mdi-close</v-icon>
                  </div>

                  <div class="modal-body" align="left" style="left: 100px">
                    <slot name="body">
                      <v-col>
                        <div
                          style="
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                          "
                        >
                          <div class="text-fields mr-7">
                            <div class="TherapistId">
                              <label class="text title">Title</label>
                              <v-col
                                style="margin-top: -10px; margin-left: -10px"
                              >
                                <v-text-field
                                  class="custom-placeholder mt-2"
                                  density="comfortable"
                                  rounded="lg"
                                  variant="outlined"
                                  placeholder="Enter Title"
                                  style="
                                    width: 400px;
                                    height: 45px;
                                    flex-shrink: 0;
                                    margin-bottom: 8px;
                                  "
                                  v-model="title"
                                  :rules="titleValidation"
                                >
                                </v-text-field>
                              </v-col>

                              <div class="url">
                                <label class="text title">Image Link</label>
                                <v-col
                                  style="margin-top: -10px; margin-left: -10px"
                                >
                                  <v-text-field
                                    class="custom-placeholder mt-2"
                                    density="comfortable"
                                    rounded="lg"
                                    variant="outlined"
                                    placeholder="Enter Image URL"
                                    style="
                                      width: 400px;
                                      height: 45px;
                                      flex-shrink: 0;
                                    "
                                    v-model="imageUrl"
                                    :rules="imageUrlValidation"
                                  >
                                  </v-text-field>
                                </v-col>
                              </div>
                            </div>
                          </div>
                          <v-col v-if="imageUrl !== ''">
                            <img
                              :src="imageUrl"
                              style="width: 188px; height: 237px"
                            />
                          </v-col>
                        </div>
                      </v-col>
                    </slot>
                  </div>
                  <div
                    class="modal-footer"
                    style="
                      display: flex;
                      justify-content: flex-end;
                      margin-top: 50px;
                    "
                  >
                    <slot name="footer">
                      <v-col cols="4">
                        <v-btn
                          rounded="xl"
                          class="text-none mx-auto"
                          color="#569AFF"
                          block
                          size="large"
                          variant="flat"
                          style="
                            color: #fff;
                            font-size: 15px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: normal;
                            letter-spacing: 0.13px;
                            margin-top: -40px;
                          "
                          @click="handleUpdateTip()"
                        >
                          Edit Tip</v-btn
                        >
                      </v-col>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <Transition name="delete-modal">
            <div v-if="deletePopup" class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container delete">
                  <div class="modal-header" align="left">
                    <slot class="popupheader" name="header"
                      >Confirm delete</slot
                    >
                  </div>
                  <v-divider
                    class="mt-3"
                    color="black"
                    style="opacity: 1"
                  ></v-divider>
                  <div class="modal-body" style="margin-top: 6px" align="left">
                    <slot name="body"
                      >Are you sure you want to delete :
                      {{ select.columns.title }} ?</slot
                    >
                  </div>

                  <div class="modal-footer" style="margin-bottom: 40px">
                    <slot name="footer">
                      <button
                        class="modal-default-button"
                        style="color: red"
                        @click="Delete(item, select), (deletePopup = false)"
                      >
                        Delete
                      </button>
                      <button
                        class="modal-default-button mr-5"
                        style="color: #00bf63"
                        @click="deletePopup = false"
                      >
                        Cancel
                      </button>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </template>

        <template v-slot:bottom>
          <v-row class="pt-2 px-2">
            <v-col cols="auto">
              <v-select
                variant="solo-filled"
                :hide-details="true"
                flat
                :items-per-page="tipPerPage"
                v-model="tipPerPage"
                :items="[10, 20, 30, 40, 50]"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-pagination
                active-color="primary"
                v-model="tipPage"
                :length="2"
              ></v-pagination>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-col>

    <v-col class="px-10" v-if="menu == 'link'">
      <v-row align="center">
        <v-col cols="3" style="font-weight: 600"> Manage Link </v-col>
        <v-col cols="5">
          <v-text-field
            class="mt-2"
            density="comfortable"
            rounded="xl"
            variant="outlined"
            placeholder="Search Link"
            prepend-inner-icon="mdi-magnify"
            v-model="searchLink"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2">
          <v-btn
            rounded="xl"
            class="text-none mx-auto"
            color="#569AFF"
            block
            size="x-large"
            variant="flat"
            style="font-family: 'Inter', 'sans-serif'"
            @click="clear(), (createLinkPopup = true)"
          >
            <v-icon>mdi-file-document-outline</v-icon>Create Link</v-btn
          >
        </v-col>
      </v-row>
      <v-data-table
        rounded="xl"
        v-model:page="linkPage"
        :headers="linkHeader"
        :items="filteredLink"
        :items-per-page="linkPerPage"
        class="elevation-1"
        style="border-radius: 10px"
      >
        <template v-slot:item.title="{ item }"
          ><label class="title-label">{{ showLink(item.columns.title) }}</label>
        </template>
        <template v-slot:item.url="{ item }"
          ><label class="url-label">{{ showLink(item.columns.url) }}</label>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            icon="mdi-magnify"
            color="blue"
            size="30px"
            style="margin-right: 20px"
            @click="openNewTab(item.columns.url)"
          />
          <v-btn
            icon="mdi-pencil"
            color="blue"
            size="30px"
            style="margin-right: 20px"
            @click="handleEditLink(item.columns), (select = item)"
          />
          <v-btn
            icon="mdi-delete"
            color="blue"
            size="30px"
            @click="(deletePopup = true), (select = item)"
          />
          <Transition name="edit-link-modal">
            <div v-if="editLinkPopup" class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container createlink">
                  <div class="modal-header create-popup-header" align="start">
                    <slot
                      class="popupheader"
                      style="font-weight: bolder"
                      name="header"
                      >Edit Link
                    </slot>
                    <v-icon @click="editLinkPopup = false">mdi-close</v-icon>
                  </div>

                  <div class="modal-body" align="left" style="left: 100px">
                    <slot name="body">
                      <div style="display: flex; flex-direction: row">
                        <div class="title">
                          <label class="text title">Title</label>
                          <v-col style="margin-top: -10px; margin-left: -10px">
                            <v-text-field
                              class="custom-placeholder mt-2"
                              density="comfortable"
                              rounded="lg"
                              variant="outlined"
                              placeholder="Enter Title"
                              style="
                                width: 500px;
                                height: 45px;
                                flex-shrink: 0;
                                margin-bottom: 8px;
                              "
                              v-model="title"
                              :rules="titleValidation"
                            >
                            </v-text-field>
                          </v-col>

                          <label class="text title">URL</label>
                          <v-col style="margin-top: -10px; margin-left: -10px">
                            <v-text-field
                              class="custom-placeholder mt-2"
                              density="comfortable"
                              rounded="lg"
                              variant="outlined"
                              placeholder="Enter URL"
                              style="width: 500px; height: 45px; flex-shrink: 0"
                              v-model="url"
                              :rules="urlValidation"
                            >
                            </v-text-field>
                          </v-col>
                        </div>
                      </div>
                    </slot>
                  </div>

                  <div
                    class="modal-footer"
                    style="
                      display: flex;
                      justify-content: flex-end;
                      margin-top: 50px;
                    "
                  >
                    <slot name="footer">
                      <v-col cols="4">
                        <v-btn
                          rounded="xl"
                          class="text-none mx-auto"
                          color="#569AFF"
                          block
                          size="large"
                          variant="flat"
                          style="
                            color: #fff;
                            font-size: 15px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: normal;
                            letter-spacing: 0.13px;
                            margin-top: -40px;
                          "
                          @click="handleUpdateLink()"
                        >
                          Edit Link</v-btn
                        >
                      </v-col>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <Transition name="delete-link-modal">
            <div v-if="deletePopup" class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-container delete">
                  <div class="modal-header" align="left">
                    <slot class="popupheader" name="header"
                      >Confirm delete</slot
                    >
                  </div>
                  <v-divider
                    class="mt-3"
                    color="black"
                    style="opacity: 1"
                  ></v-divider>
                  <div class="modal-body" style="margin-top: 6px" align="left">
                    <slot name="body"
                      >Are you sure you want to delete :
                      {{ select.columns.title }} ?</slot
                    >
                  </div>

                  <div class="modal-footer" style="margin-bottom: 40px">
                    <slot name="footer">
                      <button
                        class="modal-default-button"
                        style="color: red"
                        @click="Delete(item, select), (deletePopup = false)"
                      >
                        Delete
                      </button>
                      <button
                        class="modal-default-button mr-5"
                        style="color: #00bf63"
                        @click="deletePopup = false"
                      >
                        Cancel
                      </button>
                    </slot>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </template>

        <template v-slot:bottom>
          <v-row class="pt-2 px-2">
            <v-col cols="auto">
              <v-select
                variant="solo-filled"
                :hide-details="true"
                flat
                :items-per-page="linkPerPage"
                v-model="linkPerPage"
                :items="[10, 20, 30, 40, 50]"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-pagination
                active-color="primary"
                v-model="linkPage"
                :length="2"
              ></v-pagination>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-col>
    <Transition name="create-carousel-modal">
      <div v-if="createCarouselPopup" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container createcarousel">
            <div class="modal-header create-popup-header" align="start">
              <slot
                class="popupheader"
                style="font-weight: bolder"
                name="header"
                >Create Carousel
              </slot>
              <v-icon @click="clear(), (createCarouselPopup = false)"
                >mdi-close</v-icon
              >
            </div>

            <div class="modal-body" align="start" style="left: 100px">
              <slot name="body">
                <v-col>
                  <div
                    style="
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                    "
                  >
                    <div class="text-fields mr-4">
                      <div class="TherapistId">
                        <label class="text title">Title</label>
                        <v-col style="margin-top: -10px; margin-left: -10px">
                          <v-text-field
                            class="custom-placeholder mt-2"
                            density="comfortable"
                            rounded="lg"
                            variant="outlined"
                            placeholder="Enter Title"
                            style="
                              width: 400px;
                              height: 45px;
                              flex-shrink: 0;
                              margin-bottom: 8px;
                            "
                            v-model="title"
                            :rules="titleValidation"
                          >
                          </v-text-field>
                        </v-col>
                        <div class="url">
                          <label class="text title">URL</label>
                          <v-col style="margin-top: -10px; margin-left: -10px">
                            <v-text-field
                              class="custom-placeholder mt-2"
                              density="comfortable"
                              rounded="lg"
                              variant="outlined"
                              placeholder="Enter URL"
                              style="
                                width: 400px;
                                height: 45px;
                                flex-shrink: 0;
                                margin-bottom: 8px;
                              "
                              v-model="url"
                              :rules="urlValidation"
                            >
                            </v-text-field>
                          </v-col>
                        </div>
                        <div class="imageurl">
                          <label class="text title">Image URL</label>
                          <v-col style="margin-top: -10px; margin-left: -10px">
                            <v-text-field
                              class="custom-placeholder mt-2"
                              density="comfortable"
                              rounded="lg"
                              variant="outlined"
                              placeholder="Enter Image URL"
                              style="
                                width: 400px;
                                height: 45px;
                                flex-shrink: 0;
                                margin-bottom: 8px;
                              "
                              v-model="imageUrl"
                              :rules="imageUrlValidation"
                            >
                            </v-text-field>
                          </v-col>
                        </div>
                      </div>
                    </div>
                    <v-col v-if="imageUrl !== ''">
                      <img
                        :src="imageUrl"
                        style="width: 375px; height: 290px"
                      />
                    </v-col>
                  </div>
                </v-col>
              </slot>
            </div>
            <div
              class="modal-footer"
              style="display: flex; justify-content: flex-end; margin-top: 50px"
            >
              <slot name="footer">
                <v-col cols="4">
                  <v-btn
                    rounded="xl"
                    class="text-none mx-auto"
                    color="#569AFF"
                    block
                    size="large"
                    variant="flat"
                    style="
                      color: #fff;
                      font-size: 15px;
                      font-style: normal;
                      font-weight: 500;
                      line-height: normal;
                      letter-spacing: 0.13px;
                      margin-top: -40px;
                    "
                    @click="handleCreateCarousel()"
                  >
                    Create Carousel</v-btn
                  >
                </v-col>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="create-tip-modal">
      <div v-if="createTipPopup" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container createtip">
            <div class="modal-header create-popup-header" align="start">
              <slot
                class="popupheader"
                style="font-weight: bolder"
                name="header"
                >Create Tip
              </slot>
              <v-icon @click="clear(), (createTipPopup = false)"
                >mdi-close</v-icon
              >
            </div>

            <div class="modal-body" align="start" style="left: 100px">
              <slot name="body">
                <v-col>
                  <div
                    style="
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                    "
                  >
                    <div class="text-fields mr-7">
                      <div class="TherapistId">
                        <label class="text title">Title</label>
                        <v-col style="margin-top: -10px; margin-left: -10px">
                          <v-text-field
                            class="custom-placeholder mt-2"
                            density="comfortable"
                            rounded="lg"
                            variant="outlined"
                            placeholder="Enter Title"
                            style="
                              width: 400px;
                              height: 45px;
                              flex-shrink: 0;
                              margin-bottom: 8px;
                            "
                            v-model="title"
                            :rules="titleValidation"
                          >
                          </v-text-field>
                        </v-col>

                        <div class="url">
                          <label class="text title">Image URL</label>
                          <v-col style="margin-top: -10px; margin-left: -10px">
                            <v-text-field
                              class="custom-placeholder mt-2"
                              density="comfortable"
                              rounded="lg"
                              variant="outlined"
                              placeholder="Enter Image URL"
                              style="width: 400px; height: 45px; flex-shrink: 0"
                              v-model="imageUrl"
                              :rules="imageUrlValidation"
                            >
                            </v-text-field>
                          </v-col>
                        </div>
                      </div>
                    </div>
                    <v-col v-if="imageUrl !== ''">
                      <img
                        :src="imageUrl"
                        style="width: 188px; height: 237px"
                      />
                    </v-col>
                  </div>
                </v-col>
              </slot>
            </div>
            <div
              class="modal-footer"
              style="display: flex; justify-content: flex-end; margin-top: 50px"
            >
              <slot name="footer">
                <v-col cols="4">
                  <v-btn
                    rounded="xl"
                    class="text-none mx-auto"
                    color="#569AFF"
                    block
                    size="large"
                    variant="flat"
                    style="
                      color: #fff;
                      font-size: 15px;
                      font-style: normal;
                      font-weight: 500;
                      line-height: normal;
                      letter-spacing: 0.13px;
                      margin-top: -40px;
                    "
                    @click="handleCreateTip()"
                  >
                    Create Tip</v-btn
                  >
                </v-col>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="create-link-modal">
      <div v-if="createLinkPopup" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container createlink">
            <div class="modal-header create-popup-header" align="start">
              <slot
                class="popupheader"
                style="font-weight: bolder"
                name="header"
                >Create Link
              </slot>
              <v-icon @click="createLinkPopup = false">mdi-close</v-icon>
            </div>

            <div class="modal-body" align="start" style="left: 100px">
              <slot name="body">
                <div style="display: flex; flex-direction: row">
                  <div class="title">
                    <label class="text title">Title</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Title"
                        style="
                          width: 500px;
                          height: 45px;
                          flex-shrink: 0;
                          margin-bottom: 8px;
                        "
                        v-model="title"
                        :rules="titleValidation"
                      >
                      </v-text-field>
                    </v-col>

                    <label class="text title">URL</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter URL"
                        style="width: 500px; height: 45px; flex-shrink: 0"
                        v-model="url"
                        :rules="urlValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                </div>
              </slot>
            </div>

            <div
              class="modal-footer"
              style="display: flex; justify-content: flex-end; margin-top: 50px"
            >
              <slot name="footer">
                <v-col cols="4">
                  <v-btn
                    rounded="xl"
                    class="text-none mx-auto"
                    color="#569AFF"
                    block
                    size="large"
                    variant="flat"
                    style="
                      color: #fff;
                      font-size: 15px;
                      font-style: normal;
                      font-weight: 500;
                      line-height: normal;
                      letter-spacing: 0.13px;
                      margin-top: -40px;
                    "
                    @click="handleCreateLink()"
                  >
                    Create Link</v-btn
                  >
                </v-col>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="edit-carousel-modal">
      <div v-if="editPopup" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container create">
            <div class="modal-header create-popup-header" align="start">
              <slot
                class="popupheader"
                style="font-weight: bolder"
                name="header"
                >Edit Link: {{ select.columns.name }}</slot
              >
              <v-icon @click="editPopup = false">mdi-close</v-icon>
            </div>

            <div class="modal-body" align="start" style="left: 100px">
              <slot name="body">
                <div style="display: flex; flex-direction: row">
                  <div class="TherapistId">
                    <label class="text title">Therapist ID</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Therapist ID"
                        style="width: 150px; height: 45px; flex-shrink: 0"
                        v-model="therapistId"
                        :rules="therapistIdValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="FirstName">
                    <label class="text title">First Name</label>
                    <v-col style="margin-top: -10px; margin-left: -10px">
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Therapist Firstname"
                        style="width: 250px; height: 45px; flex-shrink: 0"
                        v-model="firstName"
                        :rules="firstNameValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                  <div class="LastName">
                    <label class="text title">Last Name</label>
                    <v-col
                      style="
                        margin-top: -10px;
                        margin-left: -10px;
                        margin-bottom: 8px;
                      "
                    >
                      <v-text-field
                        class="custom-placeholder mt-2"
                        density="comfortable"
                        rounded="lg"
                        variant="outlined"
                        placeholder="Enter Therapist Lastname"
                        style="width: 250px; height: 45px; flex-shrink: 0"
                        v-model="lastName"
                        :rules="lastNameValidation"
                      >
                      </v-text-field>
                    </v-col>
                  </div>
                </div>
                <!-- <div style="display: flex; flex-direction: row"> -->
                <div class="email">
                  <label class="text title">Email</label>
                  <v-col
                    style="
                      margin-top: -10px;
                      margin-left: -10px;
                      margin-bottom: 8px;
                    "
                  >
                    <v-text-field
                      class="custom-placeholder mt-2"
                      density="comfortable"
                      rounded="lg"
                      variant="outlined"
                      placeholder="Enter Therapist Email"
                      style="width: 680px; height: 45px; flex-shrink: 0"
                      v-model="email"
                      :rules="emailValidation"
                    >
                    </v-text-field>
                  </v-col>
                </div>
                <div class="password">
                  <label class="text title">Password</label>
                  <v-col style="margin-top: -10px; margin-left: -10px">
                    <v-text-field
                      class="custom-placeholder mt-2"
                      density="comfortable"
                      rounded="lg"
                      variant="outlined"
                      placeholder="Enter Therapist Password"
                      style="width: 680px; height: 45px; flex-shrink: 0"
                      v-model="password"
                      :rules="passwordValidation"
                    >
                    </v-text-field>
                  </v-col>
                </div>
                <!-- </div> -->
              </slot>
            </div>

            <div
              class="modal-footer"
              style="display: flex; justify-content: flex-end; margin-top: 50px"
            >
              <slot name="footer">
                <v-col cols="4">
                  <v-btn
                    rounded="xl"
                    class="text-none mx-auto"
                    color="#569AFF"
                    block
                    size="large"
                    variant="flat"
                    style="
                      color: #fff;
                      font-size: 15px;
                      font-style: normal;
                      font-weight: 500;
                      line-height: normal;
                      letter-spacing: 0.13px;
                      margin-top: -40px;
                    "
                    @click="handleUpdateLink()"
                  >
                    Edit Account</v-btn
                  >
                </v-col>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </v-col>
</template>

<script setup>
const carouselPage = ref(1);
const carouselPerPage = ref(10);
const tipPage = ref(1);
const tipPerPage = ref(10);
const linkPage = ref(1);
const linkPerPage = ref(10);
</script>
<script>
import { ref, computed, onMounted } from "vue";
import axios from "../axios.js";

let carousel = ref(
  // []
  [
    {
      no: "01",
      title: "Somsak Test1",
      url: "https://www.lovecarestation.com/10-%E0%B8%95%E0%B8%B8%E0%B8%A5%E0%B8%B2%E0%B8%84%E0%B8%A1-%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%82%E0%B8%A5%E0%B8%81/",
      imageUrl:
        "https://www.lovecarestation.com/wp-content/uploads/2018/10/wmhd-01-768x432.jpg",
    },
  ]
);
let tip = ref(
  // []
  [
    {
      no: "01",
      title: "Somsak Test1",
      imageUrl:
        "https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2020/05/how-to-%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95.png",
    },
    {
      no: "02",
      title: "Jane Doe",
      imageUrl: "im1",
    },
    {
      no: "03",
      title: "John Smith",
      imageUrl: "im1",
    },
    {
      no: "04",
      title: "Alice Johnson",
      imageUrl: "im1",
    },
    {
      no: "05",
      title: "Michael Brown",
      imageUrl: "im1",
    },
    {
      no: "06",
      title: "Emily Davis",
      imageUrl: "im1",
    },
  ]
);
let link = ref(
  // []
  [
    {
      no: "01",
      title: "Somsak Test1",
      url: "https://www.lovecarestation.com/10-%E0%B8%95%E0%B8%B8%E0%B8%A5%E0%B8%B2%E0%B8%84%E0%B8%A1-%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%82%E0%B8%A5%E0%B8%81/",
    },
    {
      no: "02",
      title: "Jane Doe",
      url: 36,
    },
    {
      no: "03",
      title: "John Smith",
      url: 45,
    },
    {
      no: "04",
      title: "Alice Johnson",
      url: 28,
    },
    {
      no: "05",
      title: "Michael Brown",
      url: 52,
    },
    {
      no: "06",
      title: "Emily Davis",
      url: 19,
    },
  ]
);

let searchCarousel = ref("");
let searchTip = ref("");
let searchLink = ref("");
const filteredCarousel = computed(() => {
  const searchTerm = searchCarousel.value.toLowerCase();
  return carousel.value.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );
});

const filteredTip = computed(() => {
  const searchTerm = searchTip.value.toLowerCase();
  return tip.value.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );
});

const filteredLink = computed(() => {
  const searchTerm = searchLink.value.toLowerCase();
  return link.value.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );
});

const carouselHeader = [
  {
    title: "No.",
    align: "center",
    sortable: false,
    key: "No",
  },
  { title: "Title", key: "title", sortable: false },

  { title: "Image", key: "imageUrl", align: "center", sortable: false },
  {
    title: "Link",
    key: "url",
    align: "start",
    sortable: false,
  },
  { title: "Action", key: "action", align: "center", sortable: false },
];
const tipHeader = [
  {
    title: "No.",
    align: "center",
    sortable: false,
    key: "No",
  },
  { title: "Title", key: "title", sortable: false },
  { title: "Image", key: "imageUrl", align: "center", sortable: false },
  { title: "Action", key: "action", align: "center", sortable: false },
];
const linkHeader = [
  {
    title: "No.",
    align: "center",
    sortable: false,
    key: "No",
  },
  { title: "Title", key: "title", sortable: false },
  {
    title: "Link",
    key: "url",
    align: "start",
    sortable: false,
    display: false,
  },
  { title: "Action", key: "action", align: "center", sortable: false },
];
export default {
  props: {
    deletePopup: Boolean,
  },
  data() {
    return {
      hospitalName: "",
      select: [],
      createCarouselPopup: false,
      createTipPopup: false,
      createLinkPopup: false,
      editCarouselPopup: false,
      editTipPopup: false,
      editLinkPopup: false,
      viewTipPopup: false,
      menu: "carousel",
      title: "",
      titleValidation: [
        (value) => {
          if (!value) {
            return "please enter Title";
          } else {
            return true;
          }
        },
      ],
      url: "",
      urlValidation: [
        (value) => {
          if (!value) {
            return "please enter URL";
          } else {
            return true;
          }
        },
      ],
      imageUrl: "",
      imageUrlValidation: [
        (value) => {
          if (!value) {
            return "please enter Image URL";
          } else {
            return true;
          }
        },
      ],
    };
  },
  methods: {
    handleCreateCarousel() {
      if (this.title === "" || this.url == "" || this.imageUrl === "") {
      } else {
        // console.log("Create Link", this.title, this.url);
        let param = {
          hospitalName: this.hospitalName,
          title: this.title,
          url: this.url,
          imageUrl: this.imageUrl,
          type: "carousel",
        };
        axios
          .post("/adLibraryCreate", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("Create success", response.data);
            this.createCarouselPopup = false;
            this.title = "";
            this.url = "";
            this.imageUrl = "";
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    handleCreateTip() {
      if (this.title === "" || this.imageUrl === "") {
      } else {
        // console.log("Create Link", this.title, this.url);
        let param = {
          hospitalName: this.hospitalName,
          title: this.title,
          imageUrl: this.imageUrl,
          type: "tip",
        };
        axios
          .post("/adLibraryCreate", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("Create success", response.data);
            this.createTipPopup = false;
            this.title = "";
            this.imageUrl = "";
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    handleCreateLink() {
      if (this.title === "" || this.url === "") {
      } else {
        // console.log("Create Link", this.title, this.url);
        let param = {
          hospitalName: this.hospitalName,
          title: this.title,
          url: this.url,
          type: "link",
        };
        axios
          .post("/adLibraryCreate", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("Create success", response.data);

            this.createLinkPopup = false;
            this.title = "";
            this.url = "";
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    handleEditCarousel(carousel) {
      this.editCarouselPopup = true;
      this.title = carousel.title;
      this.imageUrl = carousel.imageUrl;
      this.url = carousel.url;
      // console.log("Edit Link");
      // console.log("Edit Link", this.title, this.url);
    },
    handleEditTip(tip) {
      this.editTipPopup = true;
      this.title = tip.title;
      this.imageUrl = tip.imageUrl;
    },
    handleEditLink(link) {
      this.editLinkPopup = true;
      this.title = link.title;
      this.url = link.url;
      // console.log("Edit Link");
      // console.log("Edit Link", this.title, this.url);
    },
    handleUpdateCarousel() {
      let param;
      if (this.title === "" || this.url === "" || this.imageUrl == "") {
      } else {
        if (this.title === this.select.columns.title) {
          param = {
            hospitalName: this.hospitalName,
            title: this.title,
            url: this.url,
            imageUrl: this.imageUrl,
            type: "carousel",
          };
        } else if (this.title !== this.select.columns.title) {
          param = {
            hospitalName: this.hospitalName,
            title: this.select.columns.title,
            titleNew: this.title,
            url: this.url,
            imageUrl: this.imageUrl,
            type: "carousel",
          };
        }

        axios
          .post("/adLibraryEdit", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("Edit success", response.data);
            this.title = "";
            this.url = "";
            this.imageUrl = "";
            this.editCarouselPopup = false;
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    handleUpdateTip() {
      if (this.title === "" || this.imageUrl == "") {
      } else {
        // console.log("Create Link", this.title, this.url);
        let param;
        if (this.title === this.select.columns.title) {
          param = {
            hospitalName: this.hospitalName,
            title: this.title,
            imageUrl: this.imageUrl,
            type: "tip",
          };
        } else if (this.title !== this.select.columns.title) {
          param = {
            hospitalName: this.hospitalName,
            title: this.select.columns.title,
            titleNew: this.title,
            imageUrl: this.imageUrl,
            type: "tip",
          };
        }

        axios
          .post("/adLibraryEdit", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("Edit success", response.data);
            this.title = "";
            this.imageUrl = "";
            this.editTipPopup = false;
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    handleUpdateLink() {
      if (this.title === "" || this.url === "") {
      } else {
        let param;
        if (this.title === this.select.columns.title) {
          param = {
            hospitalName: this.hospitalName,
            title: this.title,
            url: this.url,
            type: "link",
          };
        } else if (this.title !== this.select.columns.title) {
          param = {
            hospitalName: this.hospitalName,
            title: this.select.columns.title,
            titleNew: this.title,
            url: this.url,
            type: "link",
          };
        }

        axios
          .post("/adLibraryEdit", param, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((response) => {
            console.log("Create success", response.data);

            this.title = "";
            this.url = "";
            this.editLinkPopup = false;
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    Delete(question, select) {
      console.log("select", select);
      let param = {
        hospitalName: this.hospitalName,
        title: select.columns.title,
        type: this.menu,
      };
      axios
        .post("/adLibraryDelete", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("delete questions:", response);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    showLink(link) {
      if (link.length > 30) {
        return link.substring(0, 30) + "...";
      } else {
        return link;
      }
    },
    openNewTab(url) {
      if (url) {
        window.open(url, "_blank");
      } else {
        console.error("URL is undefined or null.");
      }
    },
    clear() {
      this.title = "";
      this.url = "";
      this.imageUrl = "";
    },
    async dataEachMenu() {
      const param = {
        hospitalName: this.hospitalName,
        type: this.menu,
      };
      // console.log(param)
      await axios
        .post("/adLibraryView", param, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          // console.log("response", response.data);
          if (this.menu === "carousel") {
            carousel.value = response.data;
          } else if (this.menu === "tip") {
            tip.value = response.data;
          } else {
            link.value = response.data;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  async created() {
    axios
      .post("/refreshToken", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("refresh Token", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    this.hospitalName = "Siriraj Hospital";
    this.dataEachMenu();
  },
};
</script>
<style scoped>
.calendar-type {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  color: #000;
  text-align: center;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.54px;
}
</style>
<style scoped>
.custom-placeholder ::placeholder {
  font-size: 11.6px;
}
.create-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: larger;
}

.title {
  font-weight: 500;
}
.text {
  font-family: "Poppins", sans-serif;
}
/* WebKit */
.scroll::-webkit-scrollbar {
  width: 4px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #3c9bf2;
  border-radius: 4px;
}

:deep(.v-pagination__list) {
  justify-content: end;
}
.popupcreateheader {
  color: #000;
  text-align: center;
  font-family: "Inter";
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.popupheader {
  color: #000;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
}

.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 452px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fff;
  margin: 0px auto;
  padding: 20px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.delete {
  /* height: 150px; */
  height: auto;
}
.createcarousel {
  width: 900px;
  height: auto;
}
.createtip {
  width: 750px;
  height: auto;
}
.viewtip {
  width: 500px;
  height: auto;
}
.createlink {
  width: 570px;
  height: 345px;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button-duplicate {
  float: center;
}
.modal-default-button {
  float: right;
}

.calendar-type {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  color: #000;
  text-align: center;
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.54px;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
```
